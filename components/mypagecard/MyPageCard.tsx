import React from "react";
import styles from "./MyPageCard.module.css"
import { collection, updateDoc, arrayRemove, doc } from "firebase/firestore";
import { database } from '../../firebaseConfig';

interface MyPageCardProps {
    word: string;
    meaning: string;
    update: () => void;
}

const dbInstance = collection(database, 'words');
const wordRef = doc(dbInstance, "words")

const MyPageCard: React.FC<MyPageCardProps> = ({ word, meaning, update }: MyPageCardProps) => {



    const [isOpened, setIsOpened] = React.useState(false);

    const deleteWord = async () => {
        await updateDoc(wordRef, {
            word: arrayRemove(word + "," + meaning)

        }).then(() => {
            update();
        })

    }

    const handleClick = () => {
        setIsOpened(!isOpened);
    }
    
    return (
        <div className={styles.container}>
            <div className={isOpened ? `${styles.collapsed} ${styles.opened} ` : styles.collapsed}>
                <span className={styles.openicon}>
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
                </span>
                <h1><a href={`https://jisho.org/search/${word}`} target="_blank" rel="noreferrer">{word}</a></h1>
                <span className={styles.deleteicon}>
                    <svg onClick={() => deleteWord()} height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                    </svg>
                </span>
            </div>
            <div className={isOpened ? `${styles.fullheight} ${styles.opened}` : styles.fullheight}>
                <p>{meaning}</p>
            </div>

        </div>
    );
}

export default MyPageCard