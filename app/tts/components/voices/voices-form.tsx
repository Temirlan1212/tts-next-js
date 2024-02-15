"use client";

// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { VOICES, VoiceType } from "./lib/constants";
import { FormSchema, FormSchemaProps } from "./lib/form-schema";
import usePersistedForm from "./lib/_store";

// Define the validation schema for the form fields

// Define the props interface for the VoicesForm component

interface VoicesForm {}

// Main component function
export function VoicesForm(props: VoicesForm) {
  const { setValue, form: defaultForm } = usePersistedForm();

  const form = useForm<FormSchemaProps>({
    resolver: zodResolver(FormSchema),
    values: defaultForm,
  });

  // Function to handle form submission
  async function onSubmit(data: FormSchemaProps) {}

  return (
    <div className="w-full">
      {/* Form component that uses react-hook-form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="speaker_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Выберите тип голоса</FormLabel>
                {/* Select component for choosing a sound model */}
                <Select
                  onValueChange={(v) => {
                    field.onChange(v);
                    setValue("form", { speaker_id: v });
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите модель" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Map through available sound models */}
                    {VOICES.map(({ id, title }: VoiceType, index: number) => (
                      <SelectItem key={id} value={String(id)}>
                        {title}
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
        </form>
      </Form>
    </div>
  );
}
