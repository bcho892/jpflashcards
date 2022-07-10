type WordCollection = {
    bigColl: string[];
    searchColl: string[]
}
export class Collection {

    words: WordCollection;
    isSearching:boolean;

    constructor(initial: string[]) {
        this.words ={bigColl: initial, searchColl:initial};
        this.isSearching = false;
    }


    public findWord(word: string) {
        if(word.trim() === "") {
            this.isSearching = false;
            return;
        }
        
        this.isSearching = true;
        this.words.searchColl =  this.words.bigColl.filter((element: string) => element.includes(word));
    
    }

    public updateWords(newData: string[]) {
        this.words.bigColl = newData;
    }

    public size(): number {
        return !this.isSearching ? this.words.bigColl.length : this.words.searchColl.length;
    }

    public getWord(): string[] {
       
        return !this.isSearching ? this.words.bigColl : this.words.searchColl;
    }




}

