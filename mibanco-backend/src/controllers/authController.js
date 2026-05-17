const supabase = require('../supabase');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Verifica contraseña en formato Django: pbkdf2_sha256$iterations$salt$hash
function verificarPasswordDjango(passwordIngresado, passwordGuardado) {
  try {
    const partes = passwordGuardado.split('$');
    if (partes.length !== 4) return false;

    const [algoritmo, iteraciones, salt, hashGuardado] = partes;
    const iters = parseInt(iteraciones);

    const hashCalculado = crypto
      .pbkdf2Sync(passwordIngresado, salt, iters, 32, 'sha256')
      .toString('base64');

    return hashCalculado === hashGuardado;
  } catch (e) {
    return false;
  }
}

// POST /api/auth/login
async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ mensaje: 'Completa todos los campos' });
  }

  try {
    // Buscar usuario por username o email
    const { data: usuarios, error } = await supabase
      .from('usuarios_usuario')
      .select('*')
      .or(`username.eq.${username},email.eq.${username}`)
      .limit(1);

    if (error || !usuarios || usuarios.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = usuarios[0];

    if (!usuario.is_active) {
      return res.status(401).json({ mensaje: 'Usuario inactivo' });
    }

    const passwordValido = verificarPasswordDjango(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        first_name: usuario.first_name,
        last_name: usuario.last_name,
        dni: usuario.dni,
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Actualizar last_login
    await supabase
      .from('usuarios_usuario')
      .update({ last_login: new Date().toISOString() })
      .eq('id', usuario.id);

    res.json({
      token,
      user: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        first_name: usuario.first_name,
        last_name: usuario.last_name,
        dni: usuario.dni,
        telefono: usuario.telefono,
        cliente_desde: usuario.cliente_desde,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

// POST /api/auth/registro
async function registro(req, res) {
  const { username, email, password, first_name, last_name, dni, telefono } = req.body;

  if (!username || !email || !password || !dni) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  try {
    // Verificar si ya existe
    const { data: existe } = await supabase
      .from('usuarios_usuario')
      .select('id')
      .or(`username.eq.${username},email.eq.${email},dni.eq.${dni}`)
      .limit(1);

    if (existe && existe.length > 0) {
      return res.status(400).json({ mensaje: 'Usuario, email o DNI ya registrado' });
    }

    // Hashear password en formato Django
    const salt = crypto.randomBytes(6).toString('base64').slice(0, 12);
    const iterations = 1200000;
    const hash = crypto
      .pbkdf2Sync(password, salt, iterations, 32, 'sha256')
      .toString('base64');
    const passwordHash = `pbkdf2_sha256$${iterations}$${salt}$${hash}`;

    const { data: nuevoUsuario, error } = await supabase
      .from('usuarios_usuario')
      .insert([{
        username,
        email,
        password: passwordHash,
        first_name: first_name || '',
        last_name: last_name || '',
        dni,
        telefono: telefono || '',
        is_superuser: false,
        is_staff: false,
        is_active: true,
        date_joined: new Date().toISOString(),
        cliente_desde: new Date().toISOString().split('T')[0],
      }])
      .select()
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error al crear usuario' });
    }

    res.status(201).json({ mensaje: 'Usuario creado exitosamente', id: nuevoUsuario.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

// GET /api/auth/perfil  (ruta protegida)
async function perfil(req, res) {
  try {
    const { data: usuario, error } = await supabase
      .from('usuarios_usuario')
      .select('id, username, email, first_name, last_name, dni, telefono, fecha_nac, cliente_desde, foto')
      .eq('id', req.usuario.id)
      .single();

    if (error || !usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

module.exports = { login, registro, perfil };
