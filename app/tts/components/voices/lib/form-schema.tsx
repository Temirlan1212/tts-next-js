import * as z from "zod";

export const MAX_TEXT_LENGTH = 1000;

export const FormSchema = z.object({
  speaker_id: z.string({
    required_error: "Пожалуйста, выберите для использования звуковую модель",
  }),
});

export type FormSchemaProps = z.infer<typeof FormSchema>;
