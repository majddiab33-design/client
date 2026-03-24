'use client';

import { use } from "react";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function cardPage({ params }) {

    const { id } = use(params);  // <-- unwrap the Promise

    const [cardData, setCardData] = useState({
        attr_id: "",
        attr_name: "",
        attr_rate: "",
        attr_description: "",
        attr_image: "/defaultImg.png",
        attr_open:""
    });

      const dayOrder = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ];

    useEffect(() => {
        const getCardData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attraction/itemId/${id}`);
                const data = await response.json();
                setCardData(data);
            } catch (error) {
                console.error("Error fetching attraction:", error);
            }
        };

        if (id) getCardData();
    }, [id]);

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>אטרקציות</h2>
            <h1 className={styles.name}>{cardData.attr_name}</h1>
            <img
                src={cardData.attr_image}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/defaultImg.png";
                }}
                alt={cardData.attr_name}
                className={styles.image}
            />
            <p className={styles.rate}>⭐{cardData.attr_rate}</p>
            <p className={styles.description}>{cardData.attr_description}</p>

            
            <div className={styles.hoursSection}>
                <h3 className={styles.hoursTitle}>שעות פתיחה</h3>
                <ul className={styles.hoursList}>
                    {Object.entries(cardData.attr_open)
                        .sort(([dayA], [dayB]) => dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB))
                        .map(([day, hours]) => (
                            <li key={day} className={styles.hoursItem}>
                                <strong>{day}:</strong> {hours}
                            </li>
                        ))}
                </ul>
            </div>

        </div>
    );
}