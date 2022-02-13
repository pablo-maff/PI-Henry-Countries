const { Country, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Country model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Country.sync({ force: true }));
    describe("title and summary errors", () => {
      it("should throw an error if title or summary are null", (done) => {
        Country.create({})
          .then(() => done(new Error("requierd title and summary ")))
          .catch(() => done());
      });
      it("should throw an error if title is null", (done) => {
        Country.create({ title: null, summary: "this is how we do it" })
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });

      // it("should throw an error if name is null")
    });

    describe("Creating Countries", () => {
      it("Each country should has next mandatory fields: cca3, name, flags, continents, capital ", async () => {
        let country = await Country.create({
          cca3: "COL",
          name: "Colombia",
          flags: "string",
          continents: ["LATAM"],
          capital: ["bogota"],
        });
        expect(country.cca3).to.equal("COL");
        expect(country.name).to.equal("Colombia");
        expect(country.flags).to.equal("string");
        expect(country.continents[0]).to.equal("LATAM");
        expect(country.capital[0]).to.equal("bogota");
      });
    });
  });
});
