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

export const SettingsFormSchema = z.object({
  similarity_boost: z.number(),
  stability: z.number(),
  style: z.number(),
  use_speaker_boost: z.boolean().default(false),
});

export type SettingsFormSchemaProps = z.infer<typeof SettingsFormSchema>;
