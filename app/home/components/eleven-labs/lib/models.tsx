import { SettingsFormSchemaProps } from "./form-schema";

export type Voice = {
  voice_id: string;
  name: string;
  samples: null;
  category: string;
  fine_tuning: {
    language: null;
    is_allowed_to_fine_tune: false;
    finetuning_state: string;
    finetuning_progress: null;
    message: null;
    dataset_duration_seconds: null;
    verification_attempts: null;
    verification_failures: [];
    verification_attempts_count: 0;
    slice_ids: null;
    manual_verification: null;
    manual_verification_requested: false;
  };
  labels: {
    accent: string;
    description: string;
    age: string;
    gender: string;
    "use case": string;
  };
  description: null;
  preview_url: string;
  available_for_tiers: [];
  settings: null;
  sharing: null;
  high_quality_base_model_ids: [];
};

export type ElevenLabsParams = {
  text: string;
  voice: string;
};

export interface ElevenLabsSettingsFormProps {
  onSubmit: (data: SettingsFormSchemaProps) => void;
}
