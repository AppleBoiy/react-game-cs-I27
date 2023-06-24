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
  const [player_input, setPlayerInput] = useState<string[]>([]);
  const [finish_message, setFinishMessage] = useState<string>("");
  const [isOver, setOver] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [meaning, setMeaning] = useState<Word_Detail[]>([]);

  // รับคำใหม่ทุุกครั้งที่ score เพิ่ม
  useEffect(() => {
    async function getWord() {
      // รับคำศัพท์แบบสุ่ม
      const range = Math.floor(getRandomNumber() * 5 + 3);

      const new_word = String(await getRandomWord(range));
      const hint_point = Math.floor(range * new_word.length);

      setPlayerInput(
        new_word.split("").map((char, index) => {
          return index === hint_point ? char : "";
        })
      );
      setAnswer(String(new_word));
      if (score === 0) {
        setFinishMessage("");
      }

      // เฉลยคำตอบ
      return new_word;
    }

    getWord().then((answer) => console.log("correct answer is: ", answer));
  }, [score]);

  // เช็คคำตอบ
  function onCheck(player_answer: string) {
    if (isOver) {
      return;
    }
    if (!player_answer) {
      setScore(score + 1);
      setHistory([...history, { word: answer, meaning }]);
      return;
    }
    if (player_answer === answer) {
      // ถ้าถูกให้รีเซ็ตค่า HP และเพิ่มคะแนน
      // setScore(score + 1)
      setPlayerInput(answer.split(""));
      setHP([100, 0]);
    } else {
      // ถ้าไม่ถูกลด HP และเพิ่มคำใบ้ จนกว่าจะเหลือ 1 ตัว
      setHP([hp[0] - 10, hp[1] + 10]);
      if (hp[0] - 10 <= 0) {
        setOver(true);
        setPlayerInput(answer.split(""));
        return;
      }
      const not_hint_index: number[] = player_input
        .map((char, index) => {
          return char ? -1 : index;
        })
        .filter((char) => char !== -1);
      if (not_hint_index.length > 1) {
        const hint_point = Math.floor(
          getRandomNumber() * not_hint_index.length
        );

        let new_player_input = [...player_input];
        new_player_input[not_hint_index[hint_point]] =
          answer[not_hint_index[hint_point]];
        setPlayerInput(new_player_input);
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
      {isOver && <FinishWindow content={finish_message} onReset={reset} />}
      <HealthBar hp={hp} />
      <h4 style={{ widows: "100%", textAlign: "end" }}>Your Score : {score}</h4>
      <InputTap toInput={player_input} onSubmit={onCheck} isOver={isOver} />
      <hr style={{ margin: "50px 0" }} />
      <Meaning word={answer} setMeaning={setMeaning} />
      {history.length > 0 && <History data={history} />}
    </>
  );
}
