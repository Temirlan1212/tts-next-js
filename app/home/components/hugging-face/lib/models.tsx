interface CreateSoundRequest {
  /**
   * The URL of the pre-trained model to be used for sound generation.
   */
  modelUrl: string;

  /**
   * The input text that will be used to generate the sound.
   */
  text: string;
}
