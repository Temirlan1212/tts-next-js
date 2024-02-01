"use client";

import { FC } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export const AudioPlayer: FC<H5AudioPlayer["props"]> = (props) => (
  <ReactAudioPlayer {...props} />
);
