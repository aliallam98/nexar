import { z } from "zod";
import { descriptionSchema, nameSchema } from ".";

export const categoryFormFormSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

export type CategoryFormValues = z.infer<typeof categoryFormFormSchema>;
