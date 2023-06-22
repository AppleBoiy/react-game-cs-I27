import { FinishMessage } from './interface'
import style from './window.module.css'

type prop = {
    content: string
}

export default function FinishWindow({ content }: prop) {
    return (
        <>
            <hr style={{ margin: '30px 0' }} />
            <h1
                style={{ width: '100%', textAlign: 'center', color: '#c11000' }}
            >
                Game Over!!
            </h1>
            <h2 style={{ width: '100%', textAlign: 'center', color: 'gray' }}>
                {content}
            </h2>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <button className={style.btn} style={{ fontSize: '1.25rem' }}>
                    Retry
                </button>
            </div>
            <hr style={{ margin: '30px 0' }} />
        </>
    )
}
