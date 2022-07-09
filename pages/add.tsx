import NavBar from "../components/navbar/Navbar"
import styles from "../styles/AddWord.module.css"
import React from "react";
import ResultCard from "../components/resultcard/ResultCard";
import ExtraOptions from "../components/extraoptions/ExtraOptions";
import LoadingDots from "../components/loadingdots/LoadingDots";

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

const AddWord: React.FC<AddWordProps> = () => {

    const [isSpamBlock, setIsSpamBlock] = React.useState<boolean>(false);

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

    const handleSearchChange = (newTerm: string) => {
        setSearchOptions({ ...searchOptions, searchTerm: newTerm });
    }

    return (
        <div className={styles.container}>

            <div className={styles.searchholder}>
                <NavBar />
                <div className={styles.searchbarcontainer}>
                    <input type="text" onKeyUp={(e) => searchByEnter(e.key)} value={searchOptions.searchTerm} onChange={(e) => handleSearchChange(e.target.value)}></input>
                    <span className="seachbutton" ref={searchRef} onClick={() => getList()}></span>
                </div>

            </div>
            <div className={styles.resultscontainer}>
                <div className={styles.sidebar}>
                    <ExtraOptions search={manualSearch} langFunc={changeLang} changeSearch={handleSearchChange} />

                </div>
                <div className={styles.results}>
                    <span>
                        <h2>Search For: {searchOptions.searchTerm}</h2>
                    </span>
                    {searchOptions.results.length !== 0 && searchOptions.results[0].word === "/" ?
                        <div>
                            <h1>しばらくお待ってください</h1>
                            <LoadingDots />
                        </div> : searchOptions.results.map((result, index) => {
                            return <ResultCard word={result.word} meaning={result.meaning} key={index} />
                        })}
                </div>

            </div>
        </div>);
}

export default AddWord;