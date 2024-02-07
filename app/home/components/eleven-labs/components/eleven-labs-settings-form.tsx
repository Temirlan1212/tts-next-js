"use client";

// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ElevenLabsSettingsFormProps } from "../lib/models";
import {
  SettingsFormSchema,
  SettingsFormSchemaProps,
} from "../lib/form-schema";
import { Slider } from "@/components/ui/slider";
import useElevenLabs from "../lib/_store";
import { Checkbox } from "@/components/ui/checkbox";

// Define the validation schema for the form fields

// Define the props interface for the ElevenLabsForm component

// Main component function

const MAX_SLIDER_VALUE = 1;
const MIN_SLIDER_VALUE = 0;
const STEP_SLIDER = 0.01;

export function EleventLabsSettingsForm({
  onSubmit: onSubmitEvent,
}: ElevenLabsSettingsFormProps) {
  // State for tracking form submission status
  const { setValue, voice_settings } = useElevenLabs();

  // Initialize the react-hook-form with the validation schema
  const form = useForm<SettingsFormSchemaProps>({
    resolver: zodResolver(SettingsFormSchema),
    values: voice_settings,
  });

  // Function to handle form submission
  function onSubmit(data: SettingsFormSchemaProps) {
    onSubmitEvent(data);
    setValue("voice_settings", data);
  }

  return (
    <div>
      {/* Form component that uses react-hook-form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form field for selecting the sound model */}
          <FormField
            control={form.control}
            name="stability"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Стабильность</FormLabel>
                <Slider
                  min={MIN_SLIDER_VALUE}
                  max={MAX_SLIDER_VALUE}
                  step={STEP_SLIDER}
                  defaultValue={[value]}
                  onValueChange={(vals) => {
                    onChange(vals[0]);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="similarity_boost"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Ясность + сходство</FormLabel>
                <Slider
                  min={MIN_SLIDER_VALUE}
                  max={MAX_SLIDER_VALUE}
                  step={STEP_SLIDER}
                  defaultValue={[value]}
                  onValueChange={(vals) => {
                    onChange(vals[0]);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            defaultValue={0}
            name="style"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Стили</FormLabel>
                <Slider
                  min={MIN_SLIDER_VALUE}
                  max={MAX_SLIDER_VALUE}
                  step={STEP_SLIDER}
                  defaultValue={[value]}
                  onValueChange={(vals) => {
                    onChange(vals[0]);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            defaultValue={false}
            name="use_speaker_boost"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={value} onCheckedChange={onChange} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Усиление динамика
                  </label>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Сохранить изменения</Button>
        </form>
      </Form>
    </div>
  );
}
