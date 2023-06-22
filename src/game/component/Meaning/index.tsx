import { useEffect, useState } from 'react'
import style from './style.module.css'

type prop = {
    word: string
}

type Word_Detail = {
    part: string
    meaning: string
}

export default function Meaning({ word }: prop) {
    const [data, setData] = useState<Word_Detail[]>([])
    useEffect(() => {
        async function getMeaning() {
            if (word) {
                try {
                    const response = await fetch(
                        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
                        {
                            method: 'GET',
                        },
                    )
                    const result: any = (await response.json())[0]
                    console.log(result)
                    if (result) {
                        const new_data: Word_Detail[] = []
                        ;(
                            result.meanings as {
                                definitions: { definition: string }[]
                                partOfSpeech: string
                            }[]
                        ).forEach((type) => {
                            type.definitions.forEach((meaning) => {
                                new_data.push({
                                    part: type.partOfSpeech,
                                    meaning: meaning.definition,
                                })
                            })
                        })
                        setData(new_data)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        getMeaning()
    }, [word])

    return (
        <>
            <table className={style.table} border={1}>
                <tbody>
                    <tr>
                        <th className={style.order}>No.</th>
                        <th className={style.part}>Part Of Speech</th>
                        <th className={style.meaning}>Meaning</th>
                    </tr>
                    {data.map((detail, index) => {
                        return (
                            <tr>
                                <td className={style.order}>{index + 1}</td>
                                <td className={style.part}>{detail.part}</td>
                                <td
                                    className={style.meaning}
                                    style={{ textAlign: 'left' }}
                                >
                                    {detail.meaning}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
