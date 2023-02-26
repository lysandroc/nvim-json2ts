import { transpile } from "../src";

describe("nvim-json2ts", () => {
  test("should treat the json.parse error when it receives a invalid json", async () => {
    const scenarios = ["{}{", "Unable to parse this content as a json"];
    for await (const scenario of scenarios) {
      const { isValid } = await transpile(scenario);
      expect(isValid).toBe(false);
    }
  });

  test("should parse the json successfully", async () => {
    const scenarios = [
      {
        stringJSON: `{}`,
        expected: "export interface SchemaDefinitionName {}\n",
      },
      {
        stringJSON: `{
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
        }`,
        expected:
          "export interface SchemaDefinitionName {\n  _id?: string;\n  index?: number;\n  guid?: string;\n  isActive?: boolean;\n  balance?: string;\n  picture?: string;\n  age?: number;\n  eyeColor?: string;\n  name?: string;\n  gender?: string;\n  company?: string;\n  email?: string;\n}\n",
      },
      {
        stringJSON: JSON.stringify({
          id: "63fbbc484a7114ce5671c0d0",
          children: [
            {
              name: "Jody Newton",
              age: 2,
            },
          ],
          currentJob: {
            title: "Developer",
          },
          jobs: [
            {
              title: "teacher",
              salary: "R$ 8.679,12",
            },
          ],
          maxRunDistance: 14.7,
          hairColor: "yellow",
        }),
        expected: `export interface SchemaDefinitionName {\n  id?: string;\n  children?: {\n    name?: string;\n    age?: number;\n  }[];\n  currentJob?: {\n    title?: string;\n  };\n  jobs?: {\n    title?: string;\n    salary?: string;\n  }[];\n  maxRunDistance?: number;\n  hairColor?: string;\n}\n`,
      },
    ];

    for await (const scenario of scenarios) {
      const { isValid, textTypeDefinition } = await transpile(
        scenario.stringJSON
      );
      expect(isValid).toBe(true);
      expect(textTypeDefinition).toEqual(scenario.expected);
    }
  });
});
