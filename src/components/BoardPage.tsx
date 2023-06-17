import AllCard, { ICard } from './AllCard'
import BoardContainer from './BoardContainer'

// Pick Card from AllCard
const cards: ICard[] = [AllCard.coolDog, AllCard.headCat, AllCard.orangeDog]

// Make it Double
const doubleCards = [...cards, ...cards]

// Add unique id to each card
const cardIdArray = doubleCards.map((card) => {
    return {
        id: crypto.randomUUID(),
        ...card,
    }
})

function BoardPage() {
    return <BoardContainer cards={cardIdArray} />
}

export default BoardPage
