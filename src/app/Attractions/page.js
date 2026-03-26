'use client';
import React, { useState, useEffect } from "react";
import AttractionsList from "../components/AttractionComp/AttractionsList";
import NavBar from "../components/NavBar";

import styles from "./page.module.css";

export default function AttractionPage() {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttractions() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attraction`);
        const data = await response.json();
        setLoading(false);
        console.log(data);
        setAttractions(data);
      } catch (error) {
        console.error("Error fetching attractions:", error);
      }
    }
    fetchAttractions();
  }, []);


  return (
    <div className={styles.page}>
      <NavBar />
      <h1 className={styles.title}>האטרקציות הכי נפוצות בארץ</h1>
      {loading && (
        <div>
          <h2 className={styles.loadScreen}>loading...</h2>
        </div>
      )}
      <AttractionsList attractions={attractions} />
    </div>
  );
}