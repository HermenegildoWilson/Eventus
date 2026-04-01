const express = require('express');

const eventoRoutes = require('./eventoRoutes');
const participanteRoutes = require('./participanteRoutes');
const oradorRoutes = require('./oradorRoutes');
const sessaoRoutes = require('./sessaoRoutes');
const inscricaoRoutes = require('./inscricaoRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/eventos', eventoRoutes);
router.use('/participantes', participanteRoutes);
router.use('/oradores', oradorRoutes);
router.use('/sessoes', sessaoRoutes);
router.use('/inscricoes', inscricaoRoutes);

module.exports = router;
