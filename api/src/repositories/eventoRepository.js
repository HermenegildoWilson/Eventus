const { Evento } = require('../models');

async function findAll() {
  return Evento.findAll();
}

async function findById(id) {
  return Evento.findByPk(id);
}

async function create(data) {
  return Evento.create(data);
}

async function update(id, data) {
  await Evento.update(data, { where: { id } });
  return findById(id);
}

async function remove(id) {
  const count = await Evento.destroy({ where: { id } });
  return count > 0;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
