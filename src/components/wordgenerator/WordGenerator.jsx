import { wordList } from "../wordlist/Wordlist";

export const randomWord = wordList[Math.floor(Math.random() * wordList.length)];