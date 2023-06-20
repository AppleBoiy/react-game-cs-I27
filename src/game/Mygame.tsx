import { useEffect, useState } from 'react'
import style from './game.module.css'
import InputTap from './component/InputTap'
import HealthBar from './component/HealthBar'

export default function Mygame() {
    const [hp, setHP] = useState<[number, number]>([100, 0])
    return (
        <>
            <InputTap toInput={['d', '', '', 'a', 'b', '', '']} />
            <hr style={{ margin: '50px 0' }} />
            <HealthBar hp={hp} />
            <button onClick={() => setHP([hp[0] + 20, hp[1] - 20])}>
                เพิ่ม
            </button>
            <button onClick={() => setHP([hp[0] - 20, hp[1] + 20])}>ลด</button>
        </>
    )
}
