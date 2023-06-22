import React, { SyntheticEvent, useEffect, useState } from 'react'
import style from './style.module.css'

type prop = {
    toInput: string[]
    onSubmit: Function
}

export default function InputTap({ toInput, onSubmit }: prop) {
    const [answer, setAnswer] = useState<string[]>(
        toInput.map((char) => (char ? '--' : '')),
    );
    const [empty_index, setEmptyIndex] = useState<number[]>(
        toInput
            .map((char, index) => (char ? -1 : index))
            .filter((char) => char !== -1),
    );
    const [current_empty_index, setCurrentEmptyIndex] = useState<number>(0);

    // เช็คการเปลี่ยนแปลงของ Prop เพื่ออัพเดทค่าต่างๆ
    useEffect(() => {
        setAnswer(toInput.map((char) => (char ? '--' : '')));
        setEmptyIndex(
            toInput
                .map((char, index) => (char ? -1 : index))
                .filter((char) => char !== -1),
        )
        setCurrentEmptyIndex(0);
    }, [toInput])

    // รับค่าจาก Keyboard
    function onInput(event: React.ChangeEvent<HTMLInputElement>) {
        // เพิ่ม
        if (event.target.value) {
            if (current_empty_index < empty_index.length) {
                let new_answer = [...answer];
                const player_type = event.target.value.slice(1);
                if (player_type !== ' ') {
                    new_answer[empty_index[current_empty_index]] =
                        event.target.value.slice(1);
                    setAnswer(new_answer);
                    setCurrentEmptyIndex(current_empty_index + 1);
                }
            }
            // ลด
        } else {
            if (current_empty_index > 0) {
                let new_answer = [...answer];
                new_answer[empty_index[current_empty_index - 1]] = '';
                setAnswer(new_answer);
                setCurrentEmptyIndex(current_empty_index - 1);
            }
        }
    }

    // ส่งคำตอบ
    function onCheck(event: SyntheticEvent) {
        event.preventDefault();
        if (!answer.includes('')) {
            onSubmit(
                answer
                    .map((char, index) => {
                        return char === '--' ? toInput[index] : char
                    })
                    .join(''),
            );
        }
    }

    return (
        <>
            <form onSubmit={onCheck} className={style.input_block}>
                <div className={style.box_input_group}>
                    <input onChange={onInput} value="a" autoFocus />
                    {answer.map((char, index) => {
                        if (char === '--') {
                            return (
                                <span
                                    key={index}
                                    style={{ backgroundColor: 'white' }}
                                >
                                    {toInput[index]}
                                </span>
                            )
                        } else {
                            return <span key={index}>{char}</span>
                        }
                    })}
                </div>
                <button type="submit" className={style.btn}>
                    ยืนยัน
                </button>
            </form>
        </>
    )
}
