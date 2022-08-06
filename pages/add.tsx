import NavBar from "../components/navbar/Navbar"
import styles from "../styles/AddWord.module.css"
import React from "react";
import ResultCard from "../components/resultcard/ResultCard";
import ExtraOptions from "../components/extraoptions/ExtraOptions";
import LoadingDots from "../components/loadingdots/LoadingDots";
import { InferGetStaticPropsType, NextPage, GetStaticProps } from "next"
interface AddWordProps {
    searchTerm: string;
    results: DictSearch[];
    language: string;
}

type DictSearch = {
    word: string;
    meaning: string;
    source: string;
}

export const getStaticProps: GetStaticProps = async () => {

    const url = "https://us-central1-youreiscraper.cloudfunctions.net/app/dict/popular";
    const res = await fetch(url);
    const items = await res.json();
    return {
        props: { items },
        revalidate: 24 * 60 * 60
    };
}

const AddWord: NextPage = ({ items }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const [isSpamBlock, setIsSpamBlock] = React.useState<boolean>(false);

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const [searchOptions, setSearchOptions] = React.useState<AddWordProps>({ searchTerm: "", results: [], language: "jn" });

    const searchRef = React.useRef<HTMLInputElement>(null);

    const manualSearch = () => {
        searchRef.current!.click();
    }

    const searchByEnter = (key: string) => {

        if (key === 'Enter') manualSearch();
    }

    const changeLang = (isEnglish: boolean) => {
        let lang: string = isEnglish ? 'en' : 'jn';
        setSearchOptions({ ...searchOptions, language: lang });
    }

    const unblock = () => {

        setTimeout(() => {
            setIsSpamBlock(false);
        }, 333);
    }

    const getList = async () => {
        setIsOpen(false);
        if (isSpamBlock) return;
        const url = "https://us-central1-youreiscraper.cloudfunctions.net/app/dict?word=" + encodeURI(searchOptions.searchTerm) + "&lang=" + searchOptions.language;
        setSearchOptions({ ...searchOptions, results: [{ word: "/", meaning: "/", source: "/" }] })
        setIsSpamBlock(true);
        unblock();
        fetch(url)
            .then((res) => {
                res.json()
                    .then((entries) => {

                        setSearchOptions({ ...searchOptions, results: entries });

                    }).catch();
            })

    }
    const handleOptions = () => {
        setIsOpen(!isOpen);
    }
    const handleSearchChange = (newTerm: string) => {
        setSearchOptions({ ...searchOptions, searchTerm: newTerm });
    }

    return (
        <div className={styles.container}>
            <span className={styles.options} onClick={() => handleOptions()}>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" xmlSpace="preserve"><g><path d="M61.44,0c16.96,0,32.33,6.88,43.44,18c11.12,11.12,18,26.48,18,43.44s-6.88,32.33-18,43.44c-11.12,11.12-26.48,18-43.44,18 c-16.96,0-32.33-6.88-43.44-18C6.88,93.77,0,78.41,0,61.44C0,44.48,6.88,29.12,18,18C29.11,6.88,44.47,0,61.44,0L61.44,0z M61.44,92.3c-3.99,0-7.23-3.24-7.23-7.22s3.24-7.22,7.23-7.22c3.99,0,7.23,3.24,7.23,7.22C68.67,89.07,65.43,92.3,61.44,92.3 L61.44,92.3L61.44,92.3z M61.44,43.99c-3.99,0-7.23-3.23-7.23-7.22c0-3.99,3.24-7.22,7.23-7.22c3.99,0,7.23,3.23,7.23,7.22 S65.43,43.99,61.44,43.99L61.44,43.99L61.44,43.99z M61.44,68.15c-3.99,0-7.23-3.24-7.23-7.22c0-3.99,3.24-7.22,7.23-7.22 c3.99,0,7.23,3.24,7.23,7.22C68.67,64.91,65.43,68.15,61.44,68.15L61.44,68.15L61.44,68.15z M97.67,25.2 C88.4,15.93,75.59,10.2,61.44,10.2c-14.15,0-26.96,5.74-36.23,15.01C15.93,34.48,10.2,47.29,10.2,61.44 c0,14.15,5.74,26.96,15.01,36.24c9.27,9.27,22.08,15.01,36.24,15.01s26.96-5.74,36.23-15.01c9.27-9.27,15.01-22.08,15.01-36.24 C112.68,47.29,106.95,34.48,97.67,25.2L97.67,25.2z" /></g></svg>
            </span>
            <div className={styles.searchholder}>
                <NavBar />
                <div className={styles.searchbarcontainer}>
                    <input type="text" onKeyUp={(e) => searchByEnter(e.key)} value={searchOptions.searchTerm} onChange={(e) => handleSearchChange(e.target.value)}></input>
                    <span className="seachbutton" ref={searchRef} onClick={() => getList()}></span>
                </div>

            </div>
            <div className={styles.resultscontainer}>
                <div className={isOpen ? styles.sidebar : `${styles.sidebar} ${styles.closed}`}>
                    <ExtraOptions search={manualSearch} langFunc={changeLang} changeSearch={handleSearchChange} rankList={items} />

                </div>
                <div className={styles.results}>
                    <span>
                        <h2>Search For: {searchOptions.searchTerm}</h2>
                    </span>
                    {searchOptions.results.length !== 0 && searchOptions.results[0].word === "/" ?
                        <div>
                            <h1>しばらくお待ちください</h1>
                            <LoadingDots />
                        </div> : searchOptions.results.map((result, index) => {
                            return <ResultCard word={result.word} meaning={result.meaning} key={index} />
                        })}
                </div>

            </div>
        </div>);
}

export default AddWord;