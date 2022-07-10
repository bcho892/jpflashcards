import styles from "../styles/MyPage.module.css"
import Navbar from "../components/navbar/Navbar";
import { database } from '../firebaseConfig';
import type { NextPage } from 'next'
import { collection, getDocs } from 'firebase/firestore'
import { Collection } from "../classes/collection";
import React from "react";
import MyPageCard from "../components/mypagecard/MyPageCard"
import { formatWord } from ".";
import LoadingDots from "../components/loadingdots/LoadingDots";
const dbInstance = collection(database, 'words');
const myWords = new Collection([]);

const getMeaning = (word: string): string => {
    try {
        return word.substring(word.indexOf(",") + 1);
    } catch {
        return "見つかりませんでした。";
    }
}

const MyPage: NextPage = () => {
    const [currentWord, setCurrentWord] = React.useState<string[]>(myWords.getWord());

    const getWords = async () => {
        getDocs(dbInstance)
            .then((data) => {
                try {
                    myWords.updateWords(data.docs[0].data().word);
                    setCurrentWord(myWords.getWord());
                } catch {
                    return;
                }
            })
    }
    React.useEffect(() => {
        getWords();

    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.wordholder}>
                {currentWord.length !== 0 ? currentWord.map((item) => {
                    return <MyPageCard word={formatWord(item)} meaning={getMeaning(item)} update={getWords} />
                }) :
                    <div className={styles.loadingmessage}>
                        <h1>しばらくお待ちください。</h1>
                        <LoadingDots />
                    </div>}
            </div>
            <Navbar />
        </div>
    );
}



export default MyPage;