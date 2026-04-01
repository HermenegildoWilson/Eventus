const { Orador } = require('../models');

async function findAll() {
  return Orador.findAll();
}

async function findById(id) {
  return Orador.findByPk(id);
}

async function create(data) {
  return Orador.create(data);
}

async function update(id, data) {
  await Orador.update(data, { where: { id } });
  return findById(id);
}

async function remove(id) {
  const count = await Orador.destroy({ where: { id } });
  return count > 0;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
