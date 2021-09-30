const { Item, History } = require("../models");
const faker = require("faker");
const itemCategory = require("../config/itemCategory.json");

async function add() {
  for (let i = 0; i < 30; i++) {
    const newStock = Math.floor(Math.random() * 250 + 1);
    await Item.create({
      name: faker.commerce.productName(),
      stock: newStock,
      previousStock: newStock,
      price: parseInt(faker.commerce.price()),
      category: itemCategory[Math.floor(Math.random() * itemCategory.length)],
    });
  }
}

async function remove() {
  await Item.remove();
  await History.remove();
}

if (process.argv[2] === "add") {
  add().then(() => {
    console.log("Seeders success");
    process.exit(0);
  });
} else if (process.argv[2] === "remove") {
  remove().then(() => {
    console.log("Delete data success");
    process.exit(0);
  });
}

module.exports = { add, remove };
