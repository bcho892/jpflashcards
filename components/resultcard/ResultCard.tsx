import React from "react";
import styles from "./ResultCard.module.css"
import { collection, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { database } from '../../firebaseConfig';

interface ResultCardProps {
    word: string;
    meaning: string;
}

const dbInstance = collection(database, 'words');
const wordRef = doc(dbInstance, "words")
const addWord = (word: string | undefined, meaning: string | undefined) => {
    if (word) {
        updateDoc(wordRef, {
            word: arrayUnion(word + "," + meaning)
        })
    }


}

const formatWord = (word: string): string | undefined => {
    const regex = /\【(.*?)\／|\【(.*?)\】/;
    let match = regex.exec(word);
    console.log(match!);
    try {
        for (let i = 1; i < match!.length; ++i) {
            if (match![i]) {
                return match![i];
            }
        }
    } catch {
        return match![2];
    }
}

const ResultCard: React.FC<ResultCardProps> = ({ word, meaning }: ResultCardProps) => {
    const [isOpened, setIsOpened] = React.useState(false);

    const handleClick = () => {
        setIsOpened(!isOpened);
    }

    return (
        <div className={styles.container}>
            <div className={isOpened ? `${styles.collapsed} ${styles.opened} ` : styles.collapsed}>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="1rem" height="1rem" viewBox="0 0 799.000000 1280.000000"
                    onClick={() => handleClick()}>
                    <metadata>
                        Created by potrace 1.15, written by Peter Selinger 2001-2017
                    </metadata>
                    <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                        fill="var(--var1)" stroke="none">
                        <path d="M6905 12069 c-495 -402 -1168 -948 -1495 -1214 -327 -265 -1677
-1361 -3000 -2434 l-2405 -1952 0 -69 0 -69 2405 -1952 c1323 -1073 2673
-2169 3000 -2434 327 -266 1000 -812 1495 -1214 l900 -731 93 0 92 0 0 6400 0
6400 -92 0 -93 0 -900 -731z"/>
                    </g>
                </svg>
                <h1>{word}</h1>
                <div className={styles.addbutton} onClick={() => addWord(formatWord(word), meaning)}>増加</div>
            </div>
            <div className={isOpened ? `${styles.fullheight} ${styles.opened}` : styles.fullheight}>
                <p>{meaning}</p>
            </div>

        </div>
    );
}




export default ResultCard;