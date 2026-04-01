module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Orador',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: DataTypes.STRING(100), allowNull: false },
      especialidade: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      telefone: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    },
    {
      tableName: 'Orador',
    }
  );
