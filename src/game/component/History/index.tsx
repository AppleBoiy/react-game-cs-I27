import { useEffect, useState } from "react";
import { Word_Detail } from "../Meaning";
import style from "./style.module.css";
import { getRandomNumber } from "../../../api/randomModule";

export type HistoryType = {
  word: string;
  meaning: Word_Detail[];
};

type prop = {
  data: HistoryType[];
};

export default function History({ data }: prop) {
  const [index, setIndex] = useState<number>(0);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  useEffect(() => {
    setIndex(data.length - 1);
  }, [showHistory]);

  return (
    <>
      {!showHistory ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <button onClick={() => setShowHistory(true)} className={style.btn}>
            History
          </button>
        </div>
      ) : (
        <>
          <div style={{ width: "100%", textAlign: "center" }}>
            <button onClick={() => setShowHistory(false)} className={style.btn}>
              Hide
            </button>
          </div>
          <table border={1} className={style.table}>
            <thead>
            <tr>
              <th colSpan={10} className={style.header}>
                Answer: {index + 1}
              </th>
            </tr>
            <tr>
              <th colSpan={10}>{data[index].word}</th>
            </tr>
            <tr>
              <th colSpan={10}>
                <div className={style.slidebar}>
                  {index > 0 ? (
                    <span onClick={() => setIndex(index - 1)}>back</span>
                  ) : (
                    <span></span>
                  )}
                  {index < data.length - 1 ? (
                    <span onClick={() => setIndex(index + 1)}>next</span>
                  ) : (
                    <span></span>
                  )}
                </div>
              </th>
            </tr>
            <tr>
              <th className={style.order}>No.</th>
              <th className={style.part}>Part Of Speech</th>
              <th className={style.meaning}>Meaning</th>
            </tr>
            </thead>
            <tbody>
            {data[index].meaning.map((detail, meaning_index) => {
              return (
                <tr key={getRandomNumber(true) + meaning_index}>
                  <td className={style.order}>{meaning_index + 1}</td>
                  <td className={style.part}>{detail.part}</td>
                  <td className={style.meaning} style={{ textAlign: "left" }}>
                    {detail.meaning}
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
