"use client";

// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { FormSchema, FormSchemaProps } from "../lib/form-schema";

// Define the validation schema for the form fields

// Define the props interface for the ElevenLabsForm component
interface ElevenLabsFormProps {
  handleGetAudio: (data: CreateSoundRequest) => void;
  isLoading?: boolean;
}

// Main component function
export function ElevenLabsForm({
  handleGetAudio,
  isLoading,
}: ElevenLabsFormProps) {
  // State for tracking form submission status
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [voices, setVoices] = useState([]);

  // Initialize the react-hook-form with the validation schema
  const form = useForm<FormSchemaProps>({
    resolver: zodResolver(FormSchema),
  });

  // Function to handle form submission
  function onSubmit(data: FormSchemaProps) {
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

  const fetchVoices = async () => {
    try {
      const response = await fetch("/api/generate/eleven-labs/voices");
      const voices = await response.json();
      setVoices(voices);
    } catch (error) {}
  };

  useEffect(() => {
    fetchVoices();
  }, []);

  return (
    <div>
      {/* Form component that uses react-hook-form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form field for selecting the sound model */}
          <FormField
            control={form.control}
            name="voiceId"
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
