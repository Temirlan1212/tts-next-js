// Represents a sound model with its name and URL
export interface SoundModel {
  name: string; // The name of the sound model
  url: string; // The URL to the model for generating sound
  value: string;
}

export interface Languages {
  value: string; // The name of the sound model
  name: string; // The URL to the model for generating sound
}

const LANGUAGES: Languages[] = [
  {
    name: "Кыргызча",
    value: "kg",
  },
  {
    name: "English",
    value: "en",
  },
  {
    name: "Русский",
    value: "ru",
  },
];

// An array of predefined sound models
const SOUND_MODELS: SoundModel[] = [
  {
    name: "huggingface/mms-tts-kir (kg)",
    url: "https://api-inference.huggingface.co/models/facebook/mms-tts-kir",
    value: "0:(kg)",
  },
  {
    name: "huggingface/mms-tts-rus (ru)",
    url: "https://api-inference.huggingface.co/models/facebook/mms-tts-rus",
    value: "1:(ru)",
  },
  {
    name: "huggingface/fastspeech2-en-ljspeech (en)",
    url: "https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech",
    value: "2:(en)",
  },
  {
    name: "huggingface/ESPNET - Ljspeech (en)",
    url: "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits",
    value: "3:(en)",
  },
  {
    name: "huggingface/Speechbrain - Ljspeech (en)",
    url: "https://api-inference.huggingface.co/models/speechbrain/tts-tacotron2-ljspeech",
    value: "4:(en)",
  },
  {
    name: "huggingface/Voicemod - Fastspeech2 (en)",
    url: "https://api-inference.huggingface.co/models/Voicemod/fastspeech2-en-male1",
    value: "5:(en)",
  },
];

// Export the array of sound models
export { SOUND_MODELS, LANGUAGES };
