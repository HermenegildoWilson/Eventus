const repo = require('../repositories/participanteRepository');
const { getMissingFields } = require('../utils/validation');

function parseId(param) {
  const id = Number(param);
  return Number.isInteger(id) ? id : null;
}

async function list(req, res, next) {
  try {
    const participantes = await repo.findAll();
    res.json(participantes);
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const participante = await repo.findById(id);
    if (!participante) return res.status(404).json({ message: 'Participante não encontrado.' });

    res.json(participante);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const required = ['nome', 'email', 'telefone'];
    const missing = getMissingFields(req.body, required);
    if (missing.length) {
      return res.status(400).json({ message: `Campos obrigatórios em falta: ${missing.join(', ')}` });
    }

    const participante = await repo.create(req.body);
    res.status(201).json(participante);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const required = ['nome', 'email', 'telefone'];
    const missing = getMissingFields(req.body, required);
    if (missing.length) {
      return res.status(400).json({ message: `Campos obrigatórios em falta: ${missing.join(', ')}` });
    }

    const exists = await repo.findById(id);
    if (!exists) return res.status(404).json({ message: 'Participante não encontrado.' });

    const participante = await repo.update(id, req.body);
    res.json(participante);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const ok = await repo.remove(id);
    if (!ok) return res.status(404).json({ message: 'Participante não encontrado.' });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list,
  get,
  create,
  update,
  remove,
};
