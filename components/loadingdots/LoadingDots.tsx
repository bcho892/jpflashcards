import styles from "./LoadingDots.module.css";
interface LoadingDotsProps {
    
}
 
const LoadingDots: React.FC<LoadingDotsProps> = () => {
    return ( 
        <div className={styles.container}>
            <div className={`${styles.circle}`}></div>
            <div className={`${styles.circle} ${styles.two}`}></div>
            <div className={`${styles.circle} ${styles.three}`}></div>

        </div>
     );
}
 
export default LoadingDots;