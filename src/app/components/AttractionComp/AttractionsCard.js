'use client'
import styles from "./AttractionsCard.module.css";

export default function AttractionsCard({ id, name, rate, image }) {
    return (
        <div className={styles.cardsContainer}>

            <div key={id} className={styles.card}>
                <img
                    src={image}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/400";
                    }}
                    alt={name}
                    className={styles.cardImage}
                />

                <div className={styles.cardBody}>
                    <h3 className={styles.cardName}>{name}</h3>

                    <div className={styles.cardRating}>
                        ⭐ {rate}
                    </div>
                </div>
            </div>

        </div>
    );
}