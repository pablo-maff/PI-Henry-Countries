/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

const agent = session(app);

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Country.sync({ force: true }).then(() =>
      Country.create({
        cca3: "COL",
        name: "Colombia",
        flags: "string",
        continents: ["LATAM"],
        capital: ["bogota"],
      })
    )
  );
  // afterEach(() => {
  //   Country.sync({ force: true });
  // });

  describe("GET /countries", () => {
    it("should get 200", () => agent.get("/countries").expect(200));
  });

  describe("GET /countries?name='parametro'", () => {
    it("debe retornar 200", () => agent.get("/countries?name=ARG").expect(200));
  });
});
