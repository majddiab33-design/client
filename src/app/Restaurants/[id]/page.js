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
        res_image: "https://placehold.co/400"
    });

    useEffect(() => {
        const getCardData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/restaurant/itemId/${id}`);
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
                alt={cardData.res_name}
                className={styles.image}
            />
            <p className={styles.rate}>⭐{cardData.res_rate}</p>
            <p className={styles.description}>{cardData.res_description}</p>
        </div>
    );
}