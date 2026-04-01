module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Inscricao',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'Id',
      },
      id_participante: { type: DataTypes.INTEGER, allowNull: false },
      id_evento: { type: DataTypes.INTEGER, allowNull: false },
      data_inscricao: { type: DataTypes.DATEONLY, allowNull: false },
      status_pagamento: {
        type: DataTypes.ENUM('pendente', 'pago', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendente',
      },
    },
    {
      tableName: 'Inscricao',
      indexes: [
        {
          unique: true,
          fields: ['id_participante', 'id_evento'],
        },
      ],
    }
  );
