import styles from "./CardProgress.module.css"
import React from "react";
interface CardProgressProps {
    index: number;
    size: number;
    setIndex: (arg0: number) => void;
    updateFunc: () => void; 
}

const CardProgress: React.FC<CardProgressProps> = ({ index, size, setIndex, updateFunc }: CardProgressProps) => {
    
    const onChange = (newIndex:number) => {
        setIndex(newIndex);
        updateFunc();
    } 


    return (
        
        <div className={styles.container}>

            <input className={styles.currentcard} type="number" value={index+1} onChange={(e) => onChange(e.target.valueAsNumber-1)}   />
            <h2>/</h2>
            <h1>{size}</h1>
        </div>
    );
}

export default CardProgress;