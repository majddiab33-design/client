'use client';
import React, { useState, useEffect } from "react";
import TripList from "../components/TripComp/TripList";
import NavBar from "../components/NavBar";

import styles from "./page.module.css";

export default function TripPage() {
  const [trips, setTrips] = useState([]);
  const [loading,setLoading]= useState(true);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trip`);
        const data = await response.json();
        setLoading(false);
        console.log(data);
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    }
    fetchTrips();
  }, []);

   if (loading){
    <div> <h2 className={styles.loadScreen}>loading...</h2></div>
  }

  return (
    <div className={styles.page}>
      <NavBar />
      <h1 className={styles.title}>הטיולים הכי נפוצות בארץ</h1>
      <TripList trips={trips} />
    </div>
  );
}