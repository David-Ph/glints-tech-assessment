# Create backend service to manage warehouse stocks

### API Documentation

[Click here to go to documentation](https://documenter.getpostman.com/view/14556972/UUy386EL)

### How to install

`npm install`
will install all dependencies

### How to run app locally

1. Create a `.env.development` file

2. In the content, insert the required env variable as shown in `.env.example`

3. Enter `npm run dev` in the console to run app at http://localhost:3000

### How to seed database with dummy data

1. Enter `npm run seed:dev` in the console

or

2. Enter `npm run seed:dev:remove` to clear database

### How to run test

1. Create a `.env.test` file

2. In the content, insert the required env variable as shown in `.env.example`. Note that running a test will clear the collection and seed it again before actually running the test, as such, it's recommended to use a different collection for testing.

3. Enter `npm run test` in the console to run test.

### How to seed items

`npm run seed:dev`

### How to clear database

`npm run seed:dev:remove`

### Unit Test Result

![unit test](https://i.imgur.com/NeZVFbe.png)

### Requirements:

- ✔️ Use any database you're comfortable
- ✔️ Use any library or framework you're comfortable
- ✔️ Create API that can be used for:
  - ✔️ store new item
  - ✔️ show all item
  - ✔️ show detail item
  - ✔️ update specific item information
  - ✔️ delete specific
  - ✔️ manage stock in and stock out
  - ✔️ show history stock in and stock out
- Each item should have this information:
  - ✔️ Name, stock, price, category
- ✔️ Clean documentation how to install and run your app
- ✔️ Integration testing
- ✔️ be creative as possible
- Plus point if you can:
  - ✔️ Implement Unit Test
  - ✔️ Deploy to make it live and share the link
  - Implement filter and sorting for API:
    - ✔️ show all item
    - ✔️ show history stock in and stock out
