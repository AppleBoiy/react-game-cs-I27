import getRandomWord from '../api/dictionary'

export default function MyGame() {
    getRandomWord(5).then((words: string[]) => {
        console.log(words)
    })

    return (
        <>
            <h1>Hello World</h1>
        </>
    )
}
