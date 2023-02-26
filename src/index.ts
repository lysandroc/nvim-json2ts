import { compile, JSONSchema } from "json-schema-to-typescript";
import toJsonS from "to-json-schema";
const toJsonSchema = require("to-json-schema");
// TODO: investigate why this is not working
// import toJsonSchema from "to-json-schema";

export async function generateTypes(
  parsedJSON: Record<string, unknown>
): Promise<string> {
  const jsonSchemaDefinition: JSONSchema = await toJsonSchema(parsedJSON, {
    required: false,
    postProcessFnc: (_type: unknown, schema: toJsonS.JSONSchema3or4) => ({
      ...schema,
      additionalProperties: false,
    }),
  });

  const typesDefinition = await compile(
    jsonSchemaDefinition,
    "SchemaDefinitionName",
    {
      bannerComment: "",
    }
  );

  return typesDefinition;
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
      textTypeDefinition: "The received JSON is not valid or supported.",
    };
  }
}
