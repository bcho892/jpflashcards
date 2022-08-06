import styles from "./ExtraOptions.module.css";
import React from "react";
import LoadingDots from "../loadingdots/LoadingDots";
interface ExtraOptionsProps {
    search: () => void;
    langFunc: (arg0: boolean) => void;
    changeSearch: (arg0: string) => void;
    rankList: SuggestionList[];
}

type SuggestionList = {
    word: string;
    rank: number;
}

type PageDisplay = {
    currentIndex: number;
    maxIndex: number;
}

const perPage: number = 10;

const ExtraOptions: React.FC<ExtraOptionsProps> = ({ search, langFunc, changeSearch, rankList }: ExtraOptionsProps) => {

    const [suggestions, setSuggestions] = React.useState<SuggestionList[]>(rankList);
    const [indexes, setIndexes] = React.useState<PageDisplay>({ currentIndex: 0, maxIndex: perPage });

    const getPopularDetail = (newWord: string) => {
        changeSearch(newWord);
        setTimeout(() => {
            search();
        }, 1);

    }

    const englishMode = (currentValue: boolean) => {
        langFunc(currentValue);
    }

    const nextPage = () => {
        if (indexes.currentIndex + perPage < suggestions.length) {
            setIndexes({ currentIndex: indexes.currentIndex + perPage, maxIndex: indexes.maxIndex + perPage });
        }
    }

    const prevPage = () => {
        if (indexes.currentIndex - perPage >= 0) {
            setIndexes({ currentIndex: indexes.currentIndex - perPage, maxIndex: indexes.maxIndex - perPage });
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.divider}>設定</div>
            <div className={styles.box}>
                <ul>
                    <li>
                        <input type="checkbox" onChange={(e) => englishMode(e.target.checked)}></input>
                        <label>English</label>
                    </li>

                </ul>
            </div>
            <div className={styles.divider}>ランキング</div>
            <div className={styles.box}>
                <ul>
                    {suggestions.length === 0 ?
                        <LoadingDots />
                        : suggestions.slice(indexes.currentIndex, indexes.maxIndex)
                            .map((item, index) => {
                                return <li key={item.rank} onClick={() => getPopularDetail(item.word)}>{item.rank}. {item.word}</li>
                            })}
                </ul>
                <span className={styles.buttoncontainer}>
                    <button onClick={() => prevPage()}>Back</button>
                    <button onClick={() => nextPage()}>Next</button>
                </span>
            </div>

        </div >
    );
}

export default ExtraOptions;