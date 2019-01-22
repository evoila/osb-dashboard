export interface JsonSchema {

  // BaseSchema
  $ref?: string;

  /**
   * This is important because it tells refs where
   * the root of the document is located
   */
  id?: string;

  /**
   * It is recommended that the meta-schema is
   * included in the root of any JSON Schema
   */
  $schema?: JsonSchema;

  /**
   * Title of the schema
   */
  title?: string;
  /**
   * Schema description
   */
  description?: string;
  /**
   * Default json for the object represented by
   * this schema
   */
  'default'?: any;

  // NumberSchema
  /**
   * The value must be a multiple of the number
   * (e.g. 10 is a multiple of 5)
   */
  multipleOf?: number;
  maximum?: number;

  /**
   * If true maximum must be > value, >= otherwise
   */
  exclusiveMaximum?: boolean;
  minimum?: number;

  /**
   * If true minimum must be < value, <= otherwise
   */
  exclusiveMinimum?: boolean;

  // StringSchema
  maxLength?: number;
  minLength?: number;
  /**
   * This is a regex string that the value must
   * conform to
   */
  pattern?: string;

  // ArraySchema
  additionalItems?: boolean | JsonSchema;
  items?: JsonSchema | JsonSchema[];
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;

  // ObjectSchema
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  additionalProperties?: boolean | JsonSchema;

  /**
   * Holds simple JSON Schema definitions for
   * referencing from elsewhere.
   */

  definitions?: { [key: string]: JsonSchema };

  /**
  * The keys that can exist on the object with the
  * json schema that should validate their value
  */
  properties?: { [property: string]: JsonSchema };

  /**
   * The key of this object is a regex for which
   * properties the schema applies to
   */

  patternProperties?: { [pattern: string]: JsonSchema };

  /**
   * If the key is present as a property then the
   * string of properties must also be present.
   * If the value is a JSON Schema then it must
   * also be valid for the object if the key is
   * present.
   */
  dependencies?: { [key: string]: JsonSchema | string[] };

  // GenericSchema
  /**
   * Enumerates the values that this schema can be
   * e.g.
   * {"type": "string",
     *  "enum": ["red", "green", "blue"]}
   */
  'enum'?: any[];

  /**
   * The basic type of this schema, can be one of
   * [string, number, object, array, boolean, null]
   * or an array of the acceptable types
   */
  type?: string | string[];

  // CombinedSchema
  allOf?: JsonSchema[];

  anyOf?: JsonSchema[];

  oneOf?: JsonSchema[];

  /**
   * The entity being validated must not match this schema
   */
  not?: JsonSchema;
}

export interface JsonSchemaWrapper {

  schema: JsonSchema;

}

export interface EnrichedJsonSchema {

  schema: JsonSchemaWrapper;

  layout?: Array<any>;

  data?: any;

}