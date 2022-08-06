import React from 'react'
import styles from './PracticeCard.module.css'
import LoadingDots from '../loadingdots/LoadingDots'
interface Display {
    word: string;
    back: () => void;
    next: () => void;
    updateFunc: () => void;
}

type Example = {
    sentence: string;
    source: string;

}

export const PracticeCard: React.FC<Display> = ({ word, back, next, updateFunc }: Display) => {
    const [currentExample, setCurrentExample] = React.useState<Example>({ sentence: "", source: "" });
    const [isSpamBlock, setIsSpamBlock] = React.useState<boolean>(false);
    React.useEffect(() => {
        getExample(word);
    }, [word])

    const unblock = () => {
        setTimeout(() => {
            setIsSpamBlock(false);
        }, 333);
    }

    const getExample = async (word: string) => {
        if (isSpamBlock) return;
        setIsSpamBlock(true);
        setCurrentExample({ ...currentExample, sentence: "..." })
        const url = "https://us-central1-youreiscraper.cloudfunctions.net/app?word=" + encodeURI(word) + "&selectionRange=50";

        unblock();
        fetch(url)
            .then((res) => {
                res.json()
                    .then((example) => {
                        setCurrentExample(example);
                    }
                    )
            }).catch(() =>
                console.error());

    }


    return (<div className={styles.container}>
        <div className={`${styles.navbutton} ${styles.right}`} onClick={() => { back(); updateFunc() }}>前</div>
        <span className={styles.header}><h1>{word}</h1>
            <svg onClick={() => getExample(word)} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 383.748 383.748" xmlSpace="preserve">
                <path fill='var(--var1)' d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30
		C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593
		L2.081,34.641v113.365h113.91L62.772,95.042z"/>
                <path fill='var(--var1)' d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042
		c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888
		c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"/>
            </svg>
        </span>
        <p>{currentExample.sentence !== "" && word !== undefined ? currentExample.sentence === "..." ? <LoadingDots /> : currentExample.sentence : "見つかりません"}</p>
        <p><a href={currentExample.source} target='blank'>原作へ</a></p>
        <div className={`${styles.navbutton} ${styles.left}`} onClick={() => { next(); updateFunc() }}>次</div>
    </div>
    );
}

export default PracticeCard;

