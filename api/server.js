const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = Number(process.env.PORT || 3000);

async function start() {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`API Eventus a correr em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Falha ao conectar à base de dados:', err);
    process.exit(1);
  }
}

start();
