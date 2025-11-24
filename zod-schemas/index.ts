import { z } from "zod";

export const nameSchema = z
  .string({
    required_error: "this field in required",
  })
  .min(3, "Name is should be 3 chars atleast");
export const descriptionSchema = z.string().optional();
