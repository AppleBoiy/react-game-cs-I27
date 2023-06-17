import myCosImg from '../images/mycos.png'
import { ICard } from './AllCard'
import './gameCard.css'

interface CardProps {
    card: ICard
    onClick: (cardID: string) => void
    isFlip: boolean
}

function GameCard({ card, onClick, isFlip }: CardProps) {
    const handleClick = () => {
        !isFlip && onClick(card.id!)
    }

    return (
        <div
            className={`card ${isFlip ? 'is-flipped' : ''}`}
            onClick={handleClick}
        >
            {isFlip ? (
                <img src={card.image} alt={card.value} />
            ) : (
                <img src={myCosImg} alt="mycos" />
            )}
        </div>
    )
}

export default GameCard
