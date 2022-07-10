import React from 'react';
import Link from 'next/link';
import styles from "./Navbar.module.css";
import Image from 'next/image'
import logo from './logo.png'

const Navbar: React.FC = () => {

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className={styles.container}>

      <span className={styles.menuicon} onClick={() => toggleMenu()}>
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      </span>
      <ul className={isOpen ? styles.navitems : `${styles.navitems} ${styles.closed}`}>
        <li>
          <Link href="/" >
            練習
          </Link>
        </li>

        <li>
          <Link href="/mypage">
            マイページ</Link>
        </li>

        <li >
          <Link href="/add" >
            検索
          </Link>
        </li>

      </ul>
      <span className={styles.logo}>
        <Image
          src={logo}
          alt="logo"
          width="130px"
          height="35.5px"
        />
      </span>
    </div>
  )
}

export default Navbar;

