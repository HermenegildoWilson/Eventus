const { Inscricao } = require('../models');

async function findAll() {
  return Inscricao.findAll();
}

async function findById(id) {
  return Inscricao.findByPk(id);
}

async function create(data) {
  return Inscricao.create(data);
}

async function update(id, data) {
  await Inscricao.update(data, { where: { id } });
  return findById(id);
}

async function remove(id) {
  const count = await Inscricao.destroy({ where: { id } });
  return count > 0;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
