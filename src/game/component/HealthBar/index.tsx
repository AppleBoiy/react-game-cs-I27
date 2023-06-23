import { useEffect, useState } from 'react'
import style from './style.module.css'

type prop = {
    hp: [number, number]
}

export default function HealthBar({ hp }: prop) {
    const [shake, setShake] = useState<boolean>(false)

    useEffect(() => {
        setShake(true)
        setTimeout(() => {
            setShake(false)
        }, 500)
    }, [hp])
    return (
        <>
            <div className={`${style.bar} ${shake ? style.shake : ''}`}>
                <span className={style.title}>{hp[0]}%</span>
                <span
                    className={style.show}
                    style={{
                        width: `${(hp[0] / (hp[1] + hp[0] || 1)) * 100}%`,
                        backgroundColor: '#507742',
                    }}
                ></span>
                <span
                    className={style.show}
                    style={{
                        width: `${(hp[1] / (hp[1] + hp[0] || 1)) * 100}%`,
                        backgroundColor: '#b03b3b',
                    }}
                ></span>
            </div>
        </>
    )
}
