import classnames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setWindowOpen } from "../../../store/actions";
import { getPageName, getWindowOpen } from "../../../store/selectors";
import generateNewRandomQueue from "../../../utils/generate_new_random_queue.js";
import brokenMessage from "../../assets/data/broken_message.json";
import general from "../../assets/data/general.json";
import quotes from "../../assets/data/quotes.json";
import vinyls from "../../assets/data/vinyls.json";
import andrewSrc from "../../assets/img/fresh.jpg";
import styles from "./index.module.scss";

export default function WindowsDialog() {
  const { quotes: quotesArr } = quotes;
  const { general: generalArr } = general;
  const { vinyls: vinylsArr } = vinyls;
  vinylsArr.sort();

  const [transparent, setTransparent] = useState(true);
  const [title, setTitle] = useState("Untitled - Notepad");
  const [refreshQuotesArr, setRefreshQuotesArr] = useState(true);
  const [quotesIndex, setQuotesIndex] = useState(0);
  const openDialog = useSelector(getWindowOpen);
  const pageType = useSelector(getPageName);
  const dispatch = useDispatch();

  // This is too convoluted. i forget how it works. but it does
  const orderedQuotesArr = useMemo(() => {
    return generateNewRandomQueue(quotesArr.length);
  }, [refreshQuotesArr]);

  const activeQuote = useMemo(() => {
    let quote = "";
    if (quotesIndex < orderedQuotesArr.length) {
      return quotesArr[orderedQuotesArr[quotesIndex]];
    } else {
      setRefreshQuotesArr(!refreshQuotesArr);
      setQuotesIndex(1);
      return quotesArr[orderedQuotesArr[0]];
    }
  }, [quotesIndex]);

  useEffect(() => {
    if (openDialog) {
      setTransparent(false);
    }
  }, [openDialog]);

  const handleClose = useCallback(
    (e) => {
      e.stopPropagation();
      setTransparent(true);
      setTimeout(() => {
        dispatch(setWindowOpen(false));
        if (pageType === "quote") {
          setQuotesIndex(quotesIndex + 1);
        }
      }, 2000);
    },
    [quotesIndex]
  );

  const body = useMemo(() => {
    if (pageType === "quote") {
      setTitle("Untitled - Notepad");
      return (
        <>
          <h4>Quote of the day</h4>
          <br />
          <h4>"{activeQuote || brokenMessage.message.toUpperCase()}"</h4>
          <br />
          <img src={andrewSrc} alt="" />
        </>
      );
    }
    if (pageType === "vinyl") {
      setTitle("Vinyls that I own");
      return (
        <>
          <h6>Vinyls that I own - sorted alphabetically</h6>
          <br />
          {vinylsArr.map((vinyl, i) => {
            return (
              <h6 key={i}>
                {vinyl[0]} - {vinyl[1]}
              </h6>
            );
          })}
        </>
      );
    }
    if (pageType === "general") {
      setTitle("General christmas list");
      return (
        <>
          <h6>
            general list. sorry this is so short. i'll udate if I can think of
            anything
          </h6>
          <br />
          {generalArr.map((item, i) => {
            return item.length > 1 ? (
              <a href={item[1]} key={i}>
                <h6>{item[0]}</h6>
              </a>
            ) : item[0] === "__divider" ? (
              <br />
            ) : (
              <h6 key={i}>{item[0]}</h6>
            );
          })}
        </>
      );
    }
    return "nothing";
  }, [pageType, activeQuote]);

  if (!openDialog) {
    return null;
  }

  return (
    <div
      className={classnames(styles.outer, {
        [styles.transparent]: transparent,
      })}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.bar}>
        {title}
        <div className={styles.close} onClick={handleClose}>
          X
        </div>
      </div>
      <div className={styles.toolbar}>
        <div className={styles.toolbarItem}>
          <div className={styles.firstLetter}>F</div>ile
        </div>
        <div className={styles.toolbarItem}>
          <div className={styles.firstLetter}>E</div>dit
        </div>
        <div className={styles.toolbarItem}>
          <div className={styles.firstLetter}>S</div>earch
        </div>
        <div className={styles.toolbarItem}>
          <div className={styles.firstLetter}>H</div>elp
        </div>
      </div>
      <div className={styles.body}>{body}</div>
    </div>
  );
}
