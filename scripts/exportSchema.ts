import { writeFileSync } from "fs";
import { printSchema } from "graphql";
import schema from "../graphql/schema"; // استخدم مسار نسبي صحيح

const printedSchema = printSchema(schema);
writeFileSync("schema.graphql", printedSchema);
console.log("✅ schema.graphql generated successfully");
