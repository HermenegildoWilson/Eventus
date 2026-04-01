const repo = require('../repositories/inscricaoRepository');
const { getMissingFields } = require('../utils/validation');

function parseId(param) {
  const id = Number(param);
  return Number.isInteger(id) ? id : null;
}

async function list(req, res, next) {
  try {
    const inscricoes = await repo.findAll();
    res.json(inscricoes);
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const inscricao = await repo.findById(id);
    if (!inscricao) return res.status(404).json({ message: 'Inscrição não encontrada.' });

    res.json(inscricao);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const required = ['id_participante', 'id_evento', 'data_inscricao'];
    const missing = getMissingFields(req.body, required);
    if (missing.length) {
      return res.status(400).json({ message: `Campos obrigatórios em falta: ${missing.join(', ')}` });
    }

    const inscricao = await repo.create(req.body);
    res.status(201).json(inscricao);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const required = ['id_participante', 'id_evento', 'data_inscricao', 'status_pagamento'];
    const missing = getMissingFields(req.body, required);
    if (missing.length) {
      return res.status(400).json({ message: `Campos obrigatórios em falta: ${missing.join(', ')}` });
    }

    const exists = await repo.findById(id);
    if (!exists) return res.status(404).json({ message: 'Inscrição não encontrada.' });

    const inscricao = await repo.update(id, req.body);
    res.json(inscricao);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const ok = await repo.remove(id);
    if (!ok) return res.status(404).json({ message: 'Inscrição não encontrada.' });

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
