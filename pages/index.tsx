import type { NextPage } from 'next'
import { Collection } from '../classes/collection'
import styles from '../styles/Practice.module.css'
import Navbar from '../components/navbar/Navbar'
import { PracticeCard } from '../components/practicecard/PracticeCard'
import CardProgress from '../components/CardProgress/CardProgress'
import { database } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import { InferGetStaticPropsType } from 'next'
import { GetStaticProps } from 'next'
const words: string[] = [];

const dbInstance = collection(database, 'words');

const myWords = new Collection(words);

export const formatWord = (word: string): string => {
  try {
    return word.split(",")[0];
  } catch {
    return word;
  }
}

const Practice: NextPage = ({ initialData }: InferGetStaticPropsType<typeof getStaticProps>) => {

  const [currentWord, setCurrentWord] = React.useState<string[]>(myWords.getWord());
  const [index, setIndex] = React.useState<number>(0);

  const handleSearchChange = (newTerm: string) => {

    myWords.findWord(newTerm);
    while (index >= currentWord.length) {
      goBack();
    }
    update();
  }



  const update = () => { setCurrentWord(myWords.getWord()); }

  const goNext = () => {
    index + 1 >= currentWord.length ? setIndex(0) : setIndex(index + 1);
  }

  const goBack = () => {
    index - 1 < 0 ? setIndex(currentWord.length - 1) : setIndex(index - 1);
  }

  React.useEffect(() => {
    
    myWords.updateWords(initialData);
    update();
  }, [])

  return (
    <div className={styles.container}>



      <main className={styles.container}>

        <div className={styles.searchholder}>
          <input type="text" onChange={(e) => handleSearchChange(e.target.value)} />
        </div>
        <PracticeCard word={formatWord(currentWord[index])} back={goBack} next={goNext} updateFunc={update} />
        <CardProgress index={index} size={currentWord.length} setIndex={setIndex} updateFunc={update} />
        <Navbar />
      </main>
    </div>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const res = await getDocs(dbInstance);
  const initialData: string[] = await res.docs[0].data().word;

  return {
    props: { initialData }
  }
}
export default Practice
