import React, { SyntheticEvent, useEffect, useState } from "react";
import style from "./style.module.css";

type prop = {
  toInput: string[];
  onSubmit: Function;
  isOver: boolean;
};

export default function InputTap({ toInput, onSubmit, isOver }: prop) {
  const [answer, setAnswer] = useState<string[]>(
    toInput.map((char) => (char ? "--" : ""))
  );
  const [emptyIndex, setEmptyIndex] = useState<number[]>(
    toInput
      .map((char, index) => (char ? -1 : index))
      .filter((char) => char !== -1)
  );
  const [currentEmptyIndex, setCurrentEmptyIndex] = useState<number>(0);

  useEffect(() => {
    setAnswer(toInput.map((char) => (char ? "--" : "")));
    setEmptyIndex(
      toInput
        .map((char, index) => (char ? -1 : index))
        .filter((char) => char !== -1)
    );
    setCurrentEmptyIndex(0);
  }, [toInput]);

  function onInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value) {
      if (currentEmptyIndex < emptyIndex.length) {
        let newAnswer = [...answer];
        const playerType = event.target.value.slice(1);
        if (playerType !== " ") {
          newAnswer[emptyIndex[currentEmptyIndex]] = event.target.value
            .slice(1)
            .toLowerCase();
          setAnswer(newAnswer);
          setCurrentEmptyIndex(currentEmptyIndex + 1);
        }
      }
    } else {
      if (currentEmptyIndex > 0) {
        let newAnswer = [...answer];
        newAnswer[emptyIndex[currentEmptyIndex - 1]] = "";
        setAnswer(newAnswer);
        setCurrentEmptyIndex(currentEmptyIndex - 1);
      }
    }
  }

  function onCheck(event: SyntheticEvent) {
    event.preventDefault();
    if (!answer.includes("") && toInput.includes("")) {
      onSubmit(
        answer
          .map((char, index) => {
            return char === "--" ? toInput[index] : char;
          })
          .join("")
      );
    } else if (!toInput.includes("")) {
      onSubmit("");
    }
  }

  return (
    <>
      <form onSubmit={onCheck} className={style.input_block}>
        <div className={style.box_input_group}>
          <input onChange={onInput} value="a" autoFocus />
          {answer.map((char, index) => {
            if (char === "--") {
              return (
                <span
                  key={char}
                  style={{ backgroundColor: "#E1BEA8" }}
                >
                  {toInput[index]}
                </span>
              );
            } else {
              return (
                <span
                  key={char}
                  style={{
                    backgroundColor:
                      index === emptyIndex[currentEmptyIndex]
                        ? "#efa300"
                        : "lightgray"
                  }}
                >
                  {char}
                </span>
              );
            }
          })}
        </div>
        {!isOver && (
          <button type="submit" className={style.btn}>
            {toInput.filter((char) => !char).length !== 0 ? "Confirm" : "Next"}
          </button>
        )}
      </form>
    </>
  );
}
