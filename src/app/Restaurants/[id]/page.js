'use client';

import { use } from "react";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function cardPage({ params }) {

    const { id } = use(params);  // <-- unwrap the Promise

    const [cardData, setCardData] = useState({
        res_id: "",
        res_name: "",
        res_rate: "",
        res_description: "",
        res_image: "https://placehold.co/400",
        res_open:""
    });

    useEffect(() => {
        const getCardData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/itemId/${id}`);
                const data = await response.json();
                setCardData(data);
            } catch (error) {
                console.error("Error fetching restaurant:", error);
            }
        };

        if (id) getCardData();
    }, [id]);

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>מסעדות</h2>
            <h1 className={styles.name}>{cardData.res_name}</h1>
            <img
                src={cardData.res_image}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400";
                }}
                alt={cardData.res_name}
                className={styles.image}
            />
            <p className={styles.rate}>⭐{cardData.res_rate}</p>
            <p className={styles.description}>{cardData.res_description}</p>

            <div className={styles.hoursSection}>
                <h3 className={styles.hoursTitle}>שעות פתיחה</h3>
                <ul className={styles.hoursList}>
                    {Object.entries(cardData.res_open).map(([day, hours]) => (
                        <li key={day} className={styles.hoursItem}>
                            <strong>{day}:</strong> {hours}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}