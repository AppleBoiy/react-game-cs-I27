import { useEffect, useState } from "react";
import InputTap from "./component/InputTap";
import HealthBar from "./component/HealthBar";
import getRandomWord, { getRandomNumber } from "../api/randomModule";
import FinishWindow from "./component/FinishWindow";
import Meaning, { Word_Detail } from "./component/Meaning";
import History, { HistoryType } from "./component/History";

export default function MyGame() {
  const [hp, setHP] = useState<[number, number]>([100, 0]);
  const [score, setScore] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const [playerInput, setPlayerInput] = useState<string[]>([]);
  const [finishMessage, setFinishMessage] = useState<string>("");
  const [isOver, setOver] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [meaning, setMeaning] = useState<Word_Detail[]>([]);

  useEffect(() => {
    async function getWord() {
      const range = Math.floor(getRandomNumber() * 7 + 1);
      const newWord = String(await getRandomWord(range));
      const hintPoint = Math.floor(range * newWord.length);

      setPlayerInput(
        newWord.split("").map((char, index) => {
          return index === hintPoint ? char : "";
        })
      );
      setAnswer(String(newWord));
      if (score === 0) {
        setFinishMessage("");
      }

      return newWord;
    }

    getWord().then((answer) => console.log("Correct answer is:", answer));
  }, [score]);

  function onCheck(playerAnswer: string) {
    if (isOver) {
      return;
    }
    if (!playerAnswer) {
      setScore(score + 1);
      setHistory([...history, { word: answer, meaning }]);
      return;
    }
    if (playerAnswer === answer) {
      setPlayerInput(answer.split(""));
      setHP([100, 0]);
    } else {
      setHP([hp[0] - 10, hp[1] + 10]);
      if (hp[0] - 10 <= 0) {
        setOver(true);
        setPlayerInput(answer.split(""));
        return;
      }
      const notHintIndex: number[] = playerInput
        .map((char, index) => {
          return char ? -1 : index;
        })
        .filter((char) => char !== -1);
      if (notHintIndex.length > 1) {
        const hintPoint = Math.floor(
          getRandomNumber() * notHintIndex.length
        );

        let newPlayerInput = [...playerInput];
        newPlayerInput[notHintIndex[hintPoint]] =
          answer[notHintIndex[hintPoint]];
        setPlayerInput(newPlayerInput);
      }
    }
  }

  function reset() {
    if (score === 0) {
      window.location.reload();
    }
    setScore(0);
    setHP([100, 0]);
    setHistory([]);
  }

  return (
    <>
      {isOver && <FinishWindow content={finishMessage} onReset={reset} />}
      <HealthBar hp={hp} />
      <h4 style={{ widows: "100%", textAlign: "end" }}>Your Score: {score}</h4>
      <InputTap toInput={playerInput} onSubmit={onCheck} isOver={isOver} />
      <hr style={{ margin: "50px 0" }} />
      <Meaning word={answer} setMeaning={setMeaning} />
      {history.length > 0 && <History data={history} />}
    </>
  );
}
