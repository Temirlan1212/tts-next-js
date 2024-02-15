import * as z from "zod";

export const MAX_TEXT_LENGTH = 1000;

export const FormSchema = z.object({
  text: z
    .string({
      required_error: "Пожалуйста, выберите текст для используемой модели.",
    })
    .max(
      MAX_TEXT_LENGTH,
      `Максимальная длина текста не должно состовлять больше ${MAX_TEXT_LENGTH} символов!`
    ),
});

export type FormSchemaProps = z.infer<typeof FormSchema>;
