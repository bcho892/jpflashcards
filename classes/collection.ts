export class Collection {
    words: string[];
    currentIndex: number;
    constructor(words:string[]) {
        this.words = words;
        this.currentIndex = 0;
    }

    private checkValidity(index:number):boolean{
        return index >= 0 && index < this.size();
    }
    
    public updateWords(newData:string[]){
        while(this.currentIndex >= newData.length && this.currentIndex !== 0){
            this.currentIndex--;
        }
        this.words = newData;
    }

    public size():number{
        return this.words.length;
    }

    public getWord():string{
        console.log("called");
        return this.words[this.currentIndex];
    }

    public getIndex():number{
        return this.currentIndex;
    }

    public setIndex(newIndex:number){
        
        if(this.checkValidity(newIndex)) this.currentIndex = newIndex;
    }

    public goNext() {
        !this.checkValidity(this.currentIndex+1) ? this.currentIndex = 0 : this.currentIndex++; 
    }

    public goBack() {
        !this.checkValidity(this.currentIndex-1) ? this.currentIndex = this.size() - 1 : --this.currentIndex;
        
    }


  
}

