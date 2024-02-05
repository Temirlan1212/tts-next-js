import * as z from "zod";

export const FormSchema = z.object({
  voice: z.string({
    required_error: "Пожалуйста, выберите для использования звуковую модель",
  }),
  text: z.string({
    required_error: "Пожалуйста, выберите текст для используемой модели.",
  }),
  language: z.string().optional(),
});

export type FormSchemaProps = z.infer<typeof FormSchema>;
