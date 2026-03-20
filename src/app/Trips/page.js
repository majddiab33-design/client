'use client';
import React, { useState, useEffect } from "react";
import TripList from "../components/TripComp/TripList";
import NavBar from "../components/NavBar";

import styles from "./page.module.css";

export default function TripPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await fetch("http://localhost:5000/api/trip");
        const data = await response.json();
        console.log(data);
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    }
    fetchTrips();
  }, []);

  return (
    <div className={styles.page}>
      <NavBar />
      <h1 className={styles.title}>הטיולים הכי נפוצות בארץ</h1>
      <TripList trips={trips} />
    </div>
  );
}