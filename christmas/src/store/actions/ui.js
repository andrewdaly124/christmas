import { createAction } from "@reduxjs/toolkit";

export const refreshSoundEffectQueue = createAction(
  "REFRESH_SOUND_EFFECT_QUEUE"
);

export const setPageName = createAction("SET_PAGE_NAME");

export const setWindowOpen = createAction("SET_WINDOW_OPEN");
