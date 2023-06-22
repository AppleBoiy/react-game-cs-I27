import { useEffect, useState } from 'react'
import style from './game.module.css'
import InputTap from './component/InputTap'
import HealthBar from './component/HealthBar'
import getRandomWord from '../api/dictionary'
import FinishWindow from './component/FinishWindow'
import Meaning from './component/Meaning'

export default function Mygame() {
    const [hp, setHP] = useState<[number, number]>([100, 0])
    const [score, setScore] = useState<number>(0)
    const [answer, setAnswer] = useState<string>('')
    const [player_input, setPlayerInput] = useState<string[]>([])
    const [finish_message, setFinishMessage] = useState<string>('')
    const [isOver, setOver] = useState<boolean>(false)
    const [showMeaning, setShowMeaning] = useState<boolean>(false)

    // รับคำใหม่ทุุกครั้งที่ score เพิ่ม
    useEffect(() => {
        async function getWord() {
            // รับคำศัพท์แบบสุ่ม
            const range = Math.floor(Math.random() * 7) + 1
            const new_word = String(await getRandomWord(range))
            const hint_point = Math.floor(Math.random() * new_word.length)

            setPlayerInput(
                new_word.split('').map((char, index) => {
                    return index === hint_point ? char : ''
                }),
            )
            setAnswer(String(new_word))
            if (score === 0) {
                setFinishMessage('')
            }

            // เฉลยคำตอบ
            console.log(new_word)
        }
        getWord()
    }, [score])

    // เช็คคำตอบ
    function onCheck(player_answer: string) {
        if (!player_answer) {
            setScore(score + 1)
            setShowMeaning(false)
            return
        }
        if (player_answer === answer) {
            // ถ้าถูกให้รีเซ็ตค่า HP และเพิ่มคะแนน
            // setScore(score + 1)
            setPlayerInput(answer.split(''))
            if (hp[0] + 10 <= 100) {
                setHP([hp[0] + 10, hp[1] - 10])
            }
            setShowMeaning(true)
        } else {
            // ถ้าไม่ถูกลด HP และเพิ่มคำใบ้ จนกว่าจะเหลือ 1 ตัว
            setHP([hp[0] - 10, hp[1] + 10])
            if (hp[0] - 10 <= 0) {
                randomMessage()
                setOver(true)
                return
            }
            const not_hint_index: number[] = player_input
                .map((char, index) => {
                    return char ? -1 : index
                })
                .filter((char) => char !== -1)
            if (not_hint_index.length > 1) {
                const hint_point = Math.floor(
                    Math.random() * not_hint_index.length,
                )
                let new_player_input = [...player_input]
                new_player_input[not_hint_index[hint_point]] =
                    answer[not_hint_index[hint_point]]
                setPlayerInput(new_player_input)
            }
        }
    }

    function randomMessage() {
        // กรุณาใช้ state setFinishMessage เพื่อทำการแสดงข้อความ
    }

    return (
        <>
            {isOver && <FinishWindow content={finish_message} />}
            <HealthBar hp={hp} />
            <h4 style={{ widows: '100%', textAlign: 'end' }}>
                Your Score : {score}
            </h4>
            <InputTap
                toInput={player_input}
                onSubmit={onCheck}
                isOver={isOver}
            />
            <hr style={{ margin: '50px 0' }} />
            {!showMeaning && <Meaning word={answer} />}
        </>
    )
}
