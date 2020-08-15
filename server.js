const { db } = require('./models');

const app = require('./app');

const PORT = 3000;

const init = async () => {
  // initial setup - change after one input: await db.sync({ force: true });
  await db.sync();

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
