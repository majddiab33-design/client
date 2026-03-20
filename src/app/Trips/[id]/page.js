'use client';

import { use } from "react";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function cardPage({ params }) {

    const { id } = use(params);  // <-- unwrap the Promise

    const [cardData, setCardData] = useState({
        trip_id: "",
        trip_name: "",
        trip_rate: "",
        trip_description: "",
        trip_image: "https://placehold.co/400"
    });

    useEffect(() => {
        const getCardData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/trip/itemId/${id}`);
                const data = await response.json();
                setCardData(data);
            } catch (error) {
                console.error("Error fetching trip:", error);
            }
        };

        if (id) getCardData();
    }, [id]);

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>טיולים</h2>
            <h1 className={styles.name}>{cardData.trip_name}</h1>
            <img
                src={cardData.trip_image}
                alt={cardData.trip_name}
                className={styles.image}
            />
            <p className={styles.rate}>⭐{cardData.trip_rate}</p>
            <p className={styles.description}>{cardData.trip_description}</p>
        </div>
    );
}