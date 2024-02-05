"use client";

// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  SoundModel,
  SOUND_MODELS,
  LANGUAGES,
  Languages,
} from "../lib/constants";

// Define the validation schema for the form fields
const FormSchema = z
  .object({
    soundModel: z.string({
      required_error: "Пожалуйста, выберите для использования звуковую модель",
    }),
    text: z.string({
      required_error: "Пожалуйста, выберите текст для используемой модели.",
    }),
    language: z.string().optional(),
  })
  .superRefine(({ soundModel, text }, refinementContext) => {
    if (soundModel.includes("(en)")) {
      if (new RegExp("^[а-яА-Я0-9-]+$").test(text)) {
        return refinementContext.addIssue({
          message: "Пожалуйста, введите текст на латинице",
          path: ["text"],
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (soundModel.includes("(ru)") || soundModel.includes("(kg)")) {
      if (new RegExp("^[a-zA-Z0-9-]+$").test(text)) {
        return refinementContext.addIssue({
          message: "Пожалуйста, введите текст на кириллице",
          path: ["text"],
          code: z.ZodIssueCode.custom,
        });
      }
    }
    return refinementContext;
  });

// Define the props interface for the HuggingFaceForm component
interface HuggingFaceFormProps {
  handleGetAudio: (data: CreateSoundRequest) => void;
  isLoading?: boolean;
}

// Main component function
export function HuggingFaceForm({
  handleGetAudio,
  isLoading,
}: HuggingFaceFormProps) {
  // State for tracking form submission status
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [soundsModels, setSoundsModels] = useState(SOUND_MODELS);

  // Initialize the react-hook-form with the validation schema
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Function to handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormSubmitting(true);
    const soundModel = SOUND_MODELS.find(
      (item) => item.value === data.soundModel
    );
    if (!soundModel) return;
    const soundRequest: CreateSoundRequest = {
      modelUrl: soundModel?.url,
      text: data.text,
    };

    // Call the provided handler function with the sound request
    handleGetAudio(soundRequest);

    setFormSubmitting(false);
  }

  const formLang = form.watch("language");

  useEffect(() => {
    if (!formLang) return;
    const SOUND_MODELS_FILTERED = !!formLang
      ? SOUND_MODELS.filter((item) => item.value.includes(formLang))
      : SOUND_MODELS;
    setSoundsModels(SOUND_MODELS_FILTERED);
  }, [formLang]);

  return (
    <div>
      {/* Form component that uses react-hook-form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form field for selecting the sound model */}
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Языки</FormLabel>
                {/* Select component for choosing a sound model */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={formSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите язык" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Map through available sound models */}
                    {LANGUAGES.map(
                      ({ value, name }: Languages, index: number) => (
                        <SelectItem key={`${name}-${index}`} value={value}>
                          {name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                {/* <FormDescription>
                  Эта модель будет генерировать ваш звук.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="soundModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Модельки</FormLabel>
                {/* Select component for choosing a sound model */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={formSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите модель" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Map through available sound models */}
                    {soundsModels.map((model: SoundModel, index: number) => (
                      <SelectItem
                        key={`${model.name}-${index}`}
                        value={model.value}
                      >
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <FormDescription>
                  Эта модель будет генерировать ваш звук.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Form field for entering the text */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Текст</FormLabel>
                <FormControl>
                  {/* Textarea component for entering text */}
                  <Textarea
                    disabled={formSubmitting}
                    rows={6}
                    placeholder="Введите свой текст здесь..."
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  Текст, используемый для преобразования в звук.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit button */}
          <Button type="submit" loading={isLoading} disabled={formSubmitting}>
            Перевести
          </Button>
        </form>
      </Form>
    </div>
  );
}
