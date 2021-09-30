const request = require("supertest");
const app = require("../app");
const { Item, History } = require("../models");
const seeders = require("../seeders");
let items;

beforeAll(async () => {
  await seeders.remove();
  await seeders.add();
  items = await Item.find();
});

describe("POST /items", () => {
  it("Create item should succeed", async () => {
    const response = await request(app).post("/items").send({
      name: "Coca Cola",
      stock: 50,
      price: 15000,
      category: "drinks",
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Invalid input should fail", async () => {
    const response = await request(app).post("/items").send({
      name: "a!",
      stock: "q1",
      price: "2w",
      category: "notacategory",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /items", () => {
  it("Get Items should succeed", async () => {
    const response = await request(app).get("/items");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get items with queries", async () => {
    const response = await request(app).get(
      "/items?page=1&limit=10&stockMin=1&stockMax=250&priceMin=1&priceMax=20000&category=drinks&sortBy=created_at&orderBy=desc"
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get items should not be found", async () => {
    const response = await request(app).get(
      "/items?page=20&limit=50&stockMin=10&stockMax=200&priceMin=100&priceMax=1000&category=drinks&sortBy=created_at&orderBy=desc"
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get item detail", async () => {
    const response = await request(app).get(`/items/detail/${items[0]._id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get item detail invalid item id", async () => {
    const response = await request(app).get(`/items/detail/qwe`);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get item detail not found", async () => {
    const response = await request(app).get(
      `/items/detail/61556c42b526e44d9d35d2fc`
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("PUT /items", () => {
  it("Update item info should succeed", async () => {
    const response = await request(app).put(`/items/${items[0]._id}`).send({
      name: "Pepsi",
      stock: 150,
      price: 2500,
      category: "textiles",
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update item not found", async () => {
    const response = await request(app)
      .put(`/items/61556c42b526e44d9d35d2fc`)
      .send({
        name: "Pepsi",
        stock: 150,
        price: 2500,
        category: "textiles",
      });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update item info with invalid input should fail", async () => {
    const response = await request(app).put(`/items/${items[0]._id}`).send({
      name: "!@",
      stock: "a@",
      price: "5s",
      category: "notacategory",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update item stock should succeed", async () => {
    const response = await request(app)
      .put(`/items/updateStock/${items[0]._id}`)
      .send({
        stock: 25,
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update item stock should not have enough stock", async () => {
    const response = await request(app)
      .put(`/items/updateStock/${items[0]._id}`)
      .send({
        stock: -25000,
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update item stock not found", async () => {
    const response = await request(app)
      .put(`/items/updateStock/61556c42b526e44d9d35d2fc`)
      .send({
        stock: -25000,
      });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update item stock should not be found", async () => {
    const response = await request(app)
      .put(`/items/61556c42b526e44d9d35d2fc`)
      .send({
        stock: 25,
      });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("DELETE /items", () => {
  it("Delete item succeed", async () => {
    const response = await request(app).delete(`/items/${items[1]._id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Delete item should not be found", async () => {
    const response = await request(app).delete(
      `/items/61556c42b526e44d9d35d2fc`
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /items/history", () => {
  it("Get history should succeed", async () => {
    const response = await request(app).get(`/items/history`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get history with queries", async () => {
    const response = await request(app).get(
      `/items/history?page=1&limit=2&sortBy=created_at&order_by=desc`
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get history should not be found", async () => {
    const response = await request(app).get(`/items/history?page=250&limit=50`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get history of an item should succeed", async () => {
    const response = await request(app).get(`/items/history/${items[0]._id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET invalid endpoint", () => {
  it("endpoint should not be found", async () => {
    const response = await request(app).get(`/history`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});
