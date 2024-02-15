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

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  FormSchema,
  FormSchemaProps,
  MAX_TEXT_LENGTH,
} from "./lib/form-schema";
import useTTS from "../../_store";
import { text2SpeechUlutSoft } from "../../_requests";
import useAudioUlutSoft from "@/stores/audio_ulut_soft";
import { RecatangleSkeleton } from "@/components/skeletons/rectangle-skeleton";

// Define the validation schema for the form fields

// Define the props interface for the TextFromFilesForm component

interface TextFromFilesForm {}

// Main component function
export function TextFromFilesForm(props: TextFromFilesForm) {
  const text = useTTS().text;
  // State for tracking form submission status
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const setLoadings = useTTS().setLoadings;
  const loading = useTTS().loadings.ttsUlutSoft;
  const setCurrentAudio = useAudioUlutSoft().setCurrentAudio;
  // Initialize the react-hook-form with the validation schema
  const form = useForm<FormSchemaProps>({
    resolver: zodResolver(FormSchema),
    values: { text },
  });

  // Function to handle form submission
  async function onSubmit(data: FormSchemaProps) {
    setFormSubmitting(true);
    const audio = await text2SpeechUlutSoft({ text: data.text }, setLoadings);
    const base64audio = `data:audio/wav;base64,${audio}`;
    setCurrentAudio(
      { src: base64audio, text: data.text },
      { persistToHistory: false }
    );
    setFormSubmitting(false);
  }

  if (loading) return <RecatangleSkeleton />;
  if (!text) return;

  return (
    <div>
      {/* Form component that uses react-hook-form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    rows={10}
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
          <Button
            type="submit"
            loading={loading}
            disabled={formSubmitting}
            className="w-[fit-content] p-[25px]"
          >
            Преобразовать в аудио
          </Button>
        </form>
      </Form>
    </div>
  );
}
