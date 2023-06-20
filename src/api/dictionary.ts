import { generate } from 'random-words'

export default async function getRandomWord(length: number): Promise<string[]> {
    return generate({ minLength: length, maxLength: length })
}
