import type { NextPage } from 'next'
import { Collection } from '../classes/collection'
import styles from '../styles/Practice.module.css'
import Navbar from '../components/navbar/Navbar'
import { PracticeCard } from '../components/practicecard/PracticeCard'
import CardProgress from '../components/CardProgress/CardProgress'
import { database  } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'

const words: string[] = [];

const dbInstance = collection(database, 'words');

const myWords = new Collection(words);

const Practice: NextPage = () => {

  const [currentWord, setCurrentWord] = React.useState<string>(myWords.getWord());
  const update = () => { setCurrentWord(myWords.getWord()); }

  const getWords = async () => {


    getDocs(dbInstance)
      .then((data) => {
        try {
          console.log(data.docs[0].data());
          myWords.updateWords(data.docs[0].data().word);
        } catch {
          return
        }
        update();
      }).catch()

  }
  React.useEffect(() => {

    getWords();

  })

  return (
    <div className={styles.container}>

      <main className={styles.container}>
        <PracticeCard word={currentWord} collection={myWords} updateFunc={update} />
        <CardProgress collection={myWords} updateFunc={update} />
        <Navbar />
      </main>
    </div>
  )
}

export default Practice
