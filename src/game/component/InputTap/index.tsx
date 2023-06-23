import { SyntheticEvent, useEffect, useState } from 'react'
import style from './style.module.css'

type prop = {
    toInput: string[]
    onSubmit: Function
    isOver: boolean
}

export default function InputTap({ toInput, onSubmit, isOver }: prop) {
    const [answer, setAnswer] = useState<string[]>(
        toInput.map((char) => (char ? '--' : '')),
    )
    const [empty_index, setEmptyIndex] = useState<number[]>(
        toInput
            .map((char, index) => (char ? -1 : index))
            .filter((char) => char !== -1),
    )
    const [current_empty_index, setCurrentEmptyIndex] = useState<number>(0)

    // เช็คการเปลี่ยนแปลงของ Prop เพื่ออัพเดทค่าต่างๆ
    useEffect(() => {
        setAnswer(toInput.map((char) => (char ? '--' : '')))
        setEmptyIndex(
            toInput
                .map((char, index) => (char ? -1 : index))
                .filter((char) => char !== -1),
        )
        setCurrentEmptyIndex(0)
    }, [toInput])

    // รับค่าจาก Keyboard
    function onInput(event: React.ChangeEvent<HTMLInputElement>) {
        // เพิ่ม
        if (event.target.value) {
            if (current_empty_index < empty_index.length) {
                let new_answer = [...answer]
                const player_type = event.target.value.slice(1)
                if (player_type !== ' ') {
                    new_answer[empty_index[current_empty_index]] =
                        event.target.value.slice(1).toLowerCase()
                    setAnswer(new_answer)
                    setCurrentEmptyIndex(current_empty_index + 1)
                }
            }
            // ลด
        } else {
            if (current_empty_index > 0) {
                let new_answer = [...answer]
                new_answer[empty_index[current_empty_index - 1]] = ''
                setAnswer(new_answer)
                setCurrentEmptyIndex(current_empty_index - 1)
            }
        }
    }

    // ส่งคำตอบ
    function onCheck(event: SyntheticEvent) {
        event.preventDefault()
        if (!answer.includes('') && toInput.includes('')) {
            onSubmit(
                answer
                    .map((char, index) => {
                        return char === '--' ? toInput[index] : char
                    })
                    .join(''),
            )
        } else if (!toInput.includes('')) {
            onSubmit('')
        }
    }

    return (
        <>
            <form onSubmit={onCheck} className={style.input_block}>
                <div className={style.box_input_group}>
                    <input onChange={onInput} value="a" autoFocus />
                    {answer.map((char, index) => {
                        // console.log(index===empty_index[current_empty_index])
                        if (char === '--') {
                            return (
                                <span style={{ backgroundColor: 'white' }}>
                                    {toInput[index]}
                                </span>
                            )
                        } else {
                            return (
                                <span
                                    style={{
                                        backgroundColor:
                                            index ===
                                            empty_index[current_empty_index]
                                                ? 'lightgreen'
                                                : 'lightgray',
                                    }}
                                >
                                    {char}
                                </span>
                            )
                        }
                    })}
                </div>
                {!isOver && (
                    <button type="submit" className={style.btn}>
                        {toInput.filter((char) => !char).length !== 0
                            ? 'ยืนยัน'
                            : 'ถัดไป'}
                    </button>
                )}
            </form>
        </>
    )
}
