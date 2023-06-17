import { useEffect, useState } from 'react'
import { ICard } from './AllCard'
import GameCard from './GameCard'
import { Card, Grid } from '@mui/material'

interface BoardContainerProps {
    cards: ICard[]
}

const matchCard = (
    cards: ICard[],
    firstCardID: string,
    secondCardID: string,
): boolean => {
    const firstCard = cards.find((card) => card.id === firstCardID)
    const secondCard = cards.find((card) => card.id === secondCardID)

    return firstCard?.value === secondCard?.value
}

function BoardContainer({ cards }: BoardContainerProps) {
    const [clearCardIds, setClearCardIds] = useState<string[]>([])

    const [openCardIds, setOpenCardIds] = useState<string[]>([])

    const [disableAll, setDisableAll] = useState<boolean>(false)

    const handleClickCard = (cardId: string) => {
        if (openCardIds.length === 1) {
            setDisableAll(true)
        }

        setOpenCardIds((prev) => {
            return [...prev, cardId]
        })
    }

    const isFlip = (cardId: string) => {
        return clearCardIds.includes(cardId) || openCardIds.includes(cardId)
    }

    useEffect(() => {
        if (openCardIds.length === 2) {
            const [firstCardId, secondCardId] = openCardIds
            if (matchCard(cards, firstCardId, secondCardId)) {
                setClearCardIds((prev) => [...prev, firstCardId, secondCardId])
            }
            setTimeout(() => {
                setOpenCardIds([])
                setDisableAll(false)
            }, 1000)
        }
    }, [openCardIds, cards])

    return (
        <Card
            variant="outlined"
            style={{
                padding: '24px',
                marginTop: '24px',
            }}
        >
            <Grid
                container
                spacing={2}
                style={{
                    pointerEvents: disableAll ? 'none' : 'auto',
                }}
            >
                {cards.map((card) => (
                    <Grid item xs={4} key={card.id}>
                        <GameCard
                            isFlip={isFlip(card.id!)}
                            onClick={handleClickCard}
                            card={card}
                        />
                    </Grid>
                ))}
            </Grid>
        </Card>
    )
}

export default BoardContainer
