const { Participante } = require('../models');

async function findAll() {
  return Participante.findAll();
}

async function findById(id) {
  return Participante.findByPk(id);
}

async function create(data) {
  return Participante.create(data);
}

async function update(id, data) {
  await Participante.update(data, { where: { id } });
  return findById(id);
}

async function remove(id) {
  const count = await Participante.destroy({ where: { id } });
  return count > 0;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
