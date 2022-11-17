import store from "../store";
import { refreshSoundEffectQueue } from "../store/actions";
import { getNextSoundEffect } from "../store/selectors";

/** LOOOOOOOOOOL */
// eslint-disable-next-line no-unused-vars
export function PointerDownHandler(e) {
  const nextSoundEffectIndex = getNextSoundEffect(store.getState());
  store.dispatch(refreshSoundEffectQueue());
  const soundEffect = document.getElementById(
    `sound-effect-${nextSoundEffectIndex}`
  );
  soundEffect.play();
}
