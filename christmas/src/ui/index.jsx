import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPageName, setWindowOpen } from "../store/actions";
import { getWindowOpen } from "../store/selectors";
import { PointerDownHandler } from "../utils/input_handler";
import header2Src from "./assets/img/browser.png";
import headerSrc from "./assets/img/header.png";
import andrewSrc from "./assets/img/me.jpg";
import HomeButton from "./components/home_button";
import WindowsDialog from "./components/windows_dialog";
import styles from "./index.module.scss";

// Root UI component
export default function Ui() {
  const [startMusic, setStartMusic] = useState(true);

  const dispatch = useDispatch();

  const isWindowOpen = useSelector(getWindowOpen);

  document.addEventListener("pointerdown", PointerDownHandler);

  // sometimes it'll open with the window open, sometimes fades in. who knows!
  useEffect(() => {
    dispatch(setWindowOpen(true));
  }, []);

  return (
    <div
      className={styles.ui}
      onPointerDown={() => {
        function playAndRepeat() {
          const soundEffect = document.getElementById("bg-music");
          setStartMusic(false);
          soundEffect.play();
          setTimeout(() => {
            playAndRepeat();
          }, 290000 /** length of ride w me */);
        }

        if (startMusic) {
          playAndRepeat();
        }
      }}
      onClick={() => {
        dispatch(setWindowOpen(true));
        dispatch(setPageName("quote"));
      }}
    >
      <div className={styles.mj} />
      <div className={styles.cash} />
      <div className={styles.uiBody}>
        <img className={styles.header} src={headerSrc} alt="" />
        <img className={styles.header} src={header2Src} alt="" />
        <img className={styles.andrew} src={andrewSrc} alt="" />
        <HomeButton
          text="Vinyls That I have"
          onClick={(e) => {
            e.stopPropagation();
            if (!isWindowOpen) {
              dispatch(setWindowOpen(true));
              dispatch(setPageName("vinyl"));
            }
          }}
        />
        <HomeButton
          text="General list "
          onClick={(e) => {
            e.stopPropagation();
            if (!isWindowOpen) {
              dispatch(setWindowOpen(true));
              dispatch(setPageName("general"));
            }
          }}
        />
      </div>
      <WindowsDialog />
    </div>
  );
}
