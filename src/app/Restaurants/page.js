'use client';
import React, { useState, useEffect } from "react";
import RestaurantsList from "../components/RestaurantComp/RestaurantsList";
import NavBar from "../components/NavBar";

import styles from "./page.module.css";

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurant`);
        const data = await response.json();
        console.log(data);
        setLoading(false);
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    }
    fetchRestaurants();
  }, []);

  if (loading) {
    <div> <h2 className={styles.loadScreen}>loading...</h2></div>
  }

  return (
    <div className={styles.page}>
      <NavBar />
      <h1 className={styles.title}>המסעדות הכי נפוצות בארץ</h1>
      <RestaurantsList restaurants={restaurants} />
    </div>
  );
}