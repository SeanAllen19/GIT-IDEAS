const sequelize = require("../config/connection");
const { User, Notes, Tags } = require("../models");

const userData = require("./userData.json");
const notesData = require("./notesData.json");
const tagsData = require("./tagsData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const tSeeds = await Tags.bulkCreate(tagsData, {
    individualHooks: true,
    returning: true,
  });

  const nSeeds = await Notes.bulkCreate(notesData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
