import { createReducer } from "@reduxjs/toolkit";

import generateNewRandomQueue from "../../utils/generate_new_random_queue.js";
import {
  refreshSoundEffectQueue,
  setPageName,
  setWindowOpen,
} from "../actions";

const NUM_SOUND_EFFECTS = 12; // maybe read from fs

export const DEFAULT_STATE = {
  soundEffectQueue: generateNewRandomQueue(NUM_SOUND_EFFECTS),
  pageName: "quote",
  windowOpen: false,
};

const ui = createReducer(DEFAULT_STATE, (builder) =>
  builder
    .addCase(refreshSoundEffectQueue, (state) => {
      let newQueue = [...state.soundEffectQueue];
      if (newQueue.length > 1) {
        // why 1? idk
        newQueue.shift();
      } else {
        newQueue = generateNewRandomQueue(NUM_SOUND_EFFECTS);
      }
      return { ...state, soundEffectQueue: newQueue };
    })
    .addCase(setPageName, (state, { payload }) => {
      return { ...state, pageName: payload };
    })
    .addCase(setWindowOpen, (state, { payload }) => {
      return { ...state, windowOpen: payload };
    })
);

export default ui;
