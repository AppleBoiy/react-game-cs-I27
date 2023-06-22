import { useEffect, useState } from 'react'
import InputTap from './component/InputTap'
import HealthBar from './component/HealthBar'
import getRandomWord, { getRandomNumber } from '../api/randomModule'
import FinishWindow from './component/FinishWindow'
import {
    default_finish_message,
    FinishMessage,
} from './component/FinishWindow/interface'

export default function MyGame() {
    const [hp, setHP] = useState<[number, number]>([100, 0])
    const [score, setScore] = useState<number>(0)
    const [answer, setAnswer] = useState<string>('')
    const [player_input, setPlayerInput] = useState<string[]>([])
    const [finish_message, setFinishMessage] = useState<FinishMessage>(
        default_finish_message,
    )

    // รับคำใหม่ทุุกครั้งที่ score เพิ่ม
    useEffect(() => {
        async function getWord() {
            // รับคำศัพท์แบบสุ่ม
            const range = Math.floor(getRandomNumber() * 7 + 1)

            const new_word = String(await getRandomWord(range))
            const hint_point = Math.floor(range * new_word.length)

            setPlayerInput(
                new_word.split('').map((char, index) => {
                    return index === hint_point ? char : ''
                }),
            )
            setAnswer(String(new_word))
            setFinishMessage(default_finish_message)

            // เฉลยคำตอบ
            return new_word
        }
        getWord().then((answer) => console.log('correct answer is: ', answer))
    }, [score])

    // เช็คคำตอบ
    function onCheck(player_answer: string) {
        if (player_answer === answer) {
            // ถ้าถูกให้รีเซ็ตค่า HP และเพิ่มคะแนน
            setScore(score + 1)
            setHP([100, 0])
        } else {
            // ถ้าไม่ถูกลด HP และเพิ่มคำใบ้ จนกว่าจะเหลือ 1 ตัว
            setHP([hp[0] - 10, hp[1] + 10])
            if (hp[0] - 10 <= 0) {
                selectMessage()
                return
            }
            const not_hint_index: number[] = player_input
                .map((char, index) => {
                    return char ? -1 : index
                })
                .filter((char) => char !== -1)
            if (not_hint_index.length > 1) {
                const hint_point = Math.floor(
                    getRandomNumber() * not_hint_index.length,
                )
                let new_player_input = [...player_input]
                new_player_input[not_hint_index[hint_point]] =
                    answer[not_hint_index[hint_point]]
                setPlayerInput(new_player_input)
            }
        }
    }

    function selectMessage() {
        // กรุณาใช้ state setFinishMessage เพื่อทำการแสดงข้อความ
    }
    return (
        <>
            {finish_message.head && finish_message.content && (
                <FinishWindow
                    reset={setScore}
                    score={score}
                    data={finish_message}
                />
            )}
            <h4 style={{ widows: '100%', textAlign: 'end' }}>
                คะแนนปัจจุบัน : {score}
            </h4>
            <InputTap toInput={player_input} onSubmit={onCheck} />
            <hr style={{ margin: '50px 0' }} />
            <HealthBar hp={hp} />
        </>
    )
}
