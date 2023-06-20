import { SyntheticEvent, useEffect, useState } from 'react'
import style from './style.module.css'

type prop = {
    toInput: string[]
}

export default function InputTap({ toInput }: prop) {
    const [answer, setAnswer] = useState<string[]>(
        toInput.map((char) => (char ? '--' : '')),
    )
    const empty_index: number[] = toInput
        .map((char, index) => (char ? -1 : index))
        .filter((char) => char !== -1)
    const [current_empty_index, setCurrentEmptyIndex] = useState<number>(0)

    function onInput(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value)
        if (event.target.value) {
            if (current_empty_index < empty_index.length) {
                let new_answer = [...answer]
                new_answer[empty_index[current_empty_index]] =
                    event.target.value.slice(1)
                setAnswer(new_answer)
                setCurrentEmptyIndex(current_empty_index + 1)
            }
        } else {
            if (current_empty_index > 0) {
                let new_answer = [...answer]
                new_answer[empty_index[current_empty_index - 1]] = ''
                setAnswer(new_answer)
                setCurrentEmptyIndex(current_empty_index - 1)
            }
        }
    }

    function onGo(event: SyntheticEvent) {
        event.preventDefault()
    }
    // console.log(answer)
    return (
        <>
            <form onSubmit={onGo} className={style.input_block}>
                <div className={style.box_input_group}>
                    <input onChange={onInput} value="a" autoFocus />
                    {answer.map((char, index) => {
                        if (char === '--') {
                            return (
                                <span style={{ backgroundColor: 'white' }}>
                                    {toInput[index]}
                                </span>
                            )
                        } else {
                            return <span>{char}</span>
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
