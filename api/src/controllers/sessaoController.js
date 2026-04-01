const repo = require('../repositories/sessaoRepository');
const { getMissingFields } = require('../utils/validation');

function parseId(param) {
  const id = Number(param);
  return Number.isInteger(id) ? id : null;
}

async function list(req, res, next) {
  try {
    const sessoes = await repo.findAll();
    res.json(sessoes);
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const sessao = await repo.findById(id);
    if (!sessao) return res.status(404).json({ message: 'Sessão não encontrada.' });

    res.json(sessao);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const required = ['titulo', 'data_hora', 'id_evento', 'id_orador'];
    const missing = getMissingFields(req.body, required);
    if (missing.length) {
      return res.status(400).json({ message: `Campos obrigatórios em falta: ${missing.join(', ')}` });
    }

    const sessao = await repo.create(req.body);
    res.status(201).json(sessao);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const required = ['titulo', 'data_hora', 'id_evento', 'id_orador'];
    const missing = getMissingFields(req.body, required);
    if (missing.length) {
      return res.status(400).json({ message: `Campos obrigatórios em falta: ${missing.join(', ')}` });
    }

    const exists = await repo.findById(id);
    if (!exists) return res.status(404).json({ message: 'Sessão não encontrada.' });

    const sessao = await repo.update(id, req.body);
    res.json(sessao);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const ok = await repo.remove(id);
    if (!ok) return res.status(404).json({ message: 'Sessão não encontrada.' });

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
