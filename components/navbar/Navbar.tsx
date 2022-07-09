import React from 'react';
import Link from 'next/link';
import styles from "./Navbar.module.css";
export default function navbar() {
  return (
    <div className={styles.container}>
      <ul className={styles.navitems}>
        <li>
          <Link href="/" >
            練習
          </Link></li>
        <li>マイページ</li>
        <li >
          <Link href="/add" >
            検索
          </Link>
        </li>
      </ul>
    </div>
  )
}
