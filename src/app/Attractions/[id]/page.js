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
        attr_image: "https://placehold.co/400"
    });

    useEffect(() => {
        const getCardData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/attraction/itemId/${id}`);
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
                alt={cardData.attr_name}
                className={styles.image}
            />
            <p className={styles.rate}>⭐{cardData.attr_rate}</p>
            <p className={styles.description}>{cardData.attr_description}</p>
        </div>
    );
}