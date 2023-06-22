import { generate } from 'random-words'

export default async function getRandomWord(length: number): Promise<string[]> {
    return generate({ minLength: length, maxLength: length })
}

export function getRandomNumber(): number {
    const crypto = window.crypto
    const array = new Uint8Array(1)
    const [ranNum] = crypto.getRandomValues(array)
    return ranNum / 255
}
