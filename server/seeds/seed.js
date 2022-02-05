 
const db = require("../config/connection");
const { User } = require("../models");
const userData = require("./userSeeds.json");

db.once("open", async () => {
  try {
    // Delete existing data
    await User.deleteMany({});

    // Insert Seed data to respective model
    await User.create(userData);

    console.log("Seeders successfully created");
    process.exit(0);
  } catch (err) {
    console.log(err)
  }
});