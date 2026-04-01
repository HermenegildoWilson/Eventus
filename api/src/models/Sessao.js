module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Sessao',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      titulo: { type: DataTypes.STRING(100), allowNull: false },
      data_hora: { type: DataTypes.DATE, allowNull: false },
      id_evento: { type: DataTypes.INTEGER, allowNull: false },
      id_orador: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: 'Sessao',
    }
  );
