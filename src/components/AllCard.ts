import coolDog from '../images/cool_dog.jpg'
import headCat from '../images/head_cat.png'
import multiCapi from '../images/multi_capi.jpg'
import nerdDog from '../images/nerd_dog.jpg'
import orangeDog from '../images/orange_dog.jpg'
import strongCat from '../images/strong_cat.png'

export interface ICard {
    image: string
    value: string
    id?: string
}

type AllCardT =
    | 'coolDog'
    | 'headCat'
    | 'multiCapi'
    | 'nerdDog'
    | 'orangeDog'
    | 'strongCat'

export type TAllCard = {
    [key in AllCardT]: ICard
}

const AllCard: TAllCard = {
    coolDog: {
        value: 'coolDog',
        image: coolDog,
    },
    headCat: {
        value: 'headCat',
        image: headCat,
    },
    multiCapi: {
        value: 'multiCapi',
        image: multiCapi,
    },
    nerdDog: {
        value: 'nerdDog',
        image: nerdDog,
    },
    orangeDog: {
        value: 'orangeDog',
        image: orangeDog,
    },
    strongCat: {
        value: 'strongCat',
        image: strongCat,
    },
}

export default AllCard
