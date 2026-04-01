const { Sessao } = require('../models');

async function findAll() {
  return Sessao.findAll();
}

async function findById(id) {
  return Sessao.findByPk(id);
}

async function create(data) {
  return Sessao.create(data);
}

async function update(id, data) {
  await Sessao.update(data, { where: { id } });
  return findById(id);
}

async function remove(id) {
  const count = await Sessao.destroy({ where: { id } });
  return count > 0;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
