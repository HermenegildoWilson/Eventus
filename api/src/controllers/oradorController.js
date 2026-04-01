const repo = require('../repositories/oradorRepository');
const { getMissingFields } = require('../utils/validation');

function parseId(param) {
  const id = Number(param);
  return Number.isInteger(id) ? id : null;
}

async function list(req, res, next) {
  try {
    const oradores = await repo.findAll();
    res.json(oradores);
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const orador = await repo.findById(id);
    if (!orador) return res.status(404).json({ message: 'Orador não encontrado.' });

    res.json(orador);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const required = ['nome', 'especialidade', 'email', 'telefone'];
    const missing = getMissingFields(req.body, required);
    if (missing.length) {
      return res.status(400).json({ message: `Campos obrigatórios em falta: ${missing.join(', ')}` });
    }

    const orador = await repo.create(req.body);
    res.status(201).json(orador);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const required = ['nome', 'especialidade', 'email', 'telefone'];
    const missing = getMissingFields(req.body, required);
    if (missing.length) {
      return res.status(400).json({ message: `Campos obrigatórios em falta: ${missing.join(', ')}` });
    }

    const exists = await repo.findById(id);
    if (!exists) return res.status(404).json({ message: 'Orador não encontrado.' });

    const orador = await repo.update(id, req.body);
    res.json(orador);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const ok = await repo.remove(id);
    if (!ok) return res.status(404).json({ message: 'Orador não encontrado.' });

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
