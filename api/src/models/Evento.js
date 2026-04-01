module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Evento',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: DataTypes.STRING(100), allowNull: false },
      data_inicio: { type: DataTypes.DATEONLY, allowNull: false },
      data_fim: { type: DataTypes.DATEONLY, allowNull: false },
      local: { type: DataTypes.STRING(100), allowNull: false },
      cidade: { type: DataTypes.STRING(50), allowNull: false },
      capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 },
      },
      status: {
        type: DataTypes.ENUM('planeado', 'ativo', 'encerrado', 'cancelado'),
        allowNull: false,
        defaultValue: 'planeado',
      },
      preco_inscricao: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 0 },
      },
    },
    {
      tableName: 'Evento',
    }
  );
