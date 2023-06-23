import { generate } from "random-words";

export default async function getRandomWord(length: number): Promise<string[]> {
  return generate({ minLength: length, maxLength: length });
}

export function getRandomNumber(getUnique: boolean = false): number {
  const crypto = window.crypto;
  const array = new Uint8Array(1);
  const [ranNum] = crypto.getRandomValues(array);
  if (getUnique) return ranNum + Date.now();
  return ranNum / 255;
}
