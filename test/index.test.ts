import { transpile } from "../src";

describe("nvim-json2ts", () => {
  test("should expect a json valid json", () => {});

  test("should parse the json successfully", async () => {
    const { isValid, textTypeDefinition } = await transpile(`
      {
        "_id": "63fb8d05bcb9682f5817561c",
        "index": 0,
        "guid": "6f6a7d97-29dc-40e7-be62-029d053af0a2",
        "isActive": true,
        "balance": "$1,398.92",
        "picture": "http://placehold.it/32x32",
        "age": 36,
        "eyeColor": "brown",
        "name": "Pruitt Bonner",
        "gender": "male",
        "company": "DYMI",
        "email": "pruittbonner@dymi.com"
      }
    `);
    // expect(isValid).toBe(true);
    expect(textTypeDefinition).toEqual("type MySchema = {\n  name: string;\n}");
  });

  test("should treat the json.parse error when it receives a invalid json", () => {});
});
