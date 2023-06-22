import { FinishMessage } from './interface'
import style from './window.module.css'

type prop = {
    data: FinishMessage
    reset: React.Dispatch<number>
    score: number
    onClose: Function
    meaning: string
    word: string
}

export default function FinishWindow({ data, reset, score, onClose }: prop) {
    return (
        <>
            <div className={style.background}>
                <div className={style.window}>
                    <h3>{data.head}</h3>
                    <p>{data.content}</p>
                    <h4>คะแนนที่ทำได้ {score}</h4>
                    <div className={style.btn_grp}>
                        <button
                            onClick={() => {
                                reset(0)
                                onClose()
                            }}
                        >
                            เล่นอีกครั้ง
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
