import style from './style.module.css'

type prop = {
    hp: [number, number]
}

export default function HealthBar({ hp }: prop) {
    return (
        <>
            <div className={style.bar}>
                <span className={style.title}>{hp[0]}%</span>
                <span
                    className={style.show}
                    style={{
                        width: `${(hp[0] / (hp[1] + hp[0] || 1)) * 100}%`,
                        backgroundColor: 'green',
                    }}
                ></span>
                <span
                    className={style.show}
                    style={{
                        width: `${(hp[1] / (hp[1] + hp[0] || 1)) * 100}%`,
                        backgroundColor: 'red',
                    }}
                ></span>
            </div>
        </>
    )
}
