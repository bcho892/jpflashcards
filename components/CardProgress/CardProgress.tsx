import styles from "./CardProgress.module.css"
import React from "react";
import { Collection } from "../../classes/collection"
interface CardProgressProps {
 
    collection: Collection;
    updateFunc: () => void; 
}

const CardProgress: React.FC<CardProgressProps> = ({ collection, updateFunc }: CardProgressProps) => {
    
    const [index, setIndex] = React.useState<number>(collection.getIndex());
    const onChange = (newIndex:number) => {
        collection.setIndex(newIndex);
        setIndex(collection.getIndex());
        updateFunc();
    } 

    React.useEffect(() => {
        onChange(collection.getIndex())
    })

    return (
        
        <div className={styles.container}>

            <input className={styles.currentcard} type="number" value={index+1} onChange={(e) => onChange(e.target.valueAsNumber-1)}   />
            <h2>/</h2>
            <h1>{collection.size()}</h1>
        </div>
    );
}

export default CardProgress;