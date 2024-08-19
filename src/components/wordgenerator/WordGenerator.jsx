import { wordList } from "../wordlist/Wordlist";

export const randomWord = () => {
  return wordList[Math.floor(Math.random() * wordList.length)];
};