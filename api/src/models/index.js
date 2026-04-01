const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Evento = require('./Evento')(sequelize, DataTypes);
const Participante = require('./Participante')(sequelize, DataTypes);
const Orador = require('./Orador')(sequelize, DataTypes);
const Sessao = require('./Sessao')(sequelize, DataTypes);
const Inscricao = require('./Inscricao')(sequelize, DataTypes);

Evento.hasMany(Sessao, { foreignKey: 'id_evento' });
Sessao.belongsTo(Evento, { foreignKey: 'id_evento' });

Orador.hasMany(Sessao, { foreignKey: 'id_orador' });
Sessao.belongsTo(Orador, { foreignKey: 'id_orador' });

Evento.hasMany(Inscricao, { foreignKey: 'id_evento' });
Inscricao.belongsTo(Evento, { foreignKey: 'id_evento' });

Participante.hasMany(Inscricao, { foreignKey: 'id_participante' });
Inscricao.belongsTo(Participante, { foreignKey: 'id_participante' });

module.exports = {
  sequelize,
  Evento,
  Participante,
  Orador,
  Sessao,
  Inscricao,
};
