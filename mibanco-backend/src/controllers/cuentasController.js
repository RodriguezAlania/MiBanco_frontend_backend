const supabase = require('../supabase');

// GET /api/cuentas/mias  — cuentas del usuario autenticado
async function misCuentas(req, res) {
  try {
    const { data: cuentas, error } = await supabase
      .from('cuentas')
      .select('*')
      .eq('user_id', req.usuario.id);

    if (error) {
      return res.status(500).json({ mensaje: 'Error al obtener cuentas' });
    }

    res.json(cuentas || []);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

module.exports = { misCuentas };
