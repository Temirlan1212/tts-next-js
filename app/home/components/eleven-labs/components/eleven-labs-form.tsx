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
  FormSchema,
  FormSchemaProps,
  MAX_TEXT_LENGTH,
} from "../lib/form-schema";
import { ElevenLabsParams, Voice } from "../lib/models";
import { fetchVoices } from "../lib/_requests";

// Define the validation schema for the form fields

// Define the props interface for the ElevenLabsForm component

interface ElevenLabsFormProps {
  handleGetAudio: (data: ElevenLabsParams) => void;
  isLoading?: boolean;
}

// Main component function
export function ElevenLabsForm({
  handleGetAudio,
  isLoading,
}: ElevenLabsFormProps) {
  // State for tracking form submission status
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [voices, setVoices] = useState<Voice[]>([]);

  // Initialize the react-hook-form with the validation schema
  const form = useForm<FormSchemaProps>({
    resolver: zodResolver(FormSchema),
  });

  // Function to handle form submission
  function onSubmit(data: FormSchemaProps) {
    setFormSubmitting(true);

    const soundRequest: ElevenLabsParams = data;

    // Call the provided handler function with the sound request
    handleGetAudio(soundRequest);

    setFormSubmitting(false);
  }

  useEffect(() => {
    fetchVoices(setVoices);
  }, []);

  return (
    <div>
      {/* Form component that uses react-hook-form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form field for selecting the sound model */}
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Типы голос</FormLabel>
                {/* Select component for choosing a sound model */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={formSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип голоса" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[400px]">
                    {/* Map through available sound models */}
                    {voices.map(
                      ({ voice_id, name, labels }: Voice, index: number) => (
                        <SelectItem key={`${name}-${index}`} value={voice_id}>
                          <Option labels={labels} value={name} />
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
                <p className="text-xs text-muted-foreground">
                  {field.value?.length || 0} / {MAX_TEXT_LENGTH}
                </p>
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

export function Option({
  labels,
  value,
}: {
  labels: Voice["labels"];
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span>{value}</span>
      <div className="flex items-center gap-1">
        <div className="py-[2px] px-[10px] rounded-full bg-blue-200">
          {labels.accent}
        </div>
        <div className="py-[2px] px-[10px] rounded-full bg-pink-200">
          {labels.age}
        </div>
        <div className="py-[2px] px-[10px] rounded-full bg-green-200">
          {labels.gender}
        </div>
      </div>
    </div>
  );
}
