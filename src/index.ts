import { compile, JSONSchema } from "json-schema-to-typescript";

export async function generateTypes(
  parsedJSON: Record<string, unknown>
): Promise<string> {
  const jsonSchemaDefinition = {
    title: "MySchemaName",
    type: "object",
    properties: {
      foo: {
        type: "object",
        tsType: "Set<number|string>",
      },
      bar: {
        description: "Comparator function",
        instanceOf: "Function",
        tsType: "(a: number, b: number) => number",
      },
      foobar: { $ref: "#/definitions/foobar" },
    },
    definitions: {
      foobar: {
        description: "Map from number to string",
        tsType: "Map<number, string>",
      },
    },
    additionalProperties: false,
  } as JSONSchema;

  const types = await compile(jsonSchemaDefinition, "SchemaDefinitionName", {
    bannerComment: "",
  });
  return types;
}

export async function transpile(
  jsonText: string
  // options: unknown
): Promise<{
  isValid: boolean;
  textTypeDefinition: string;
}> {
  try {
    const parsedJSON = JSON.parse(jsonText) as Record<string, unknown>;
    const typeDefinition = await generateTypes(parsedJSON);

    return { isValid: true, textTypeDefinition: typeDefinition };
  } catch (e) {
    return {
      isValid: false,
      textTypeDefinition: "The received JSON is not valid.",
    };
  }
}
