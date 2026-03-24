'use client'
import styles from "./RestaurantCard.module.css";

export default function RestaurantCard({ id, name, rate, image }) {
    return (
        <div className={styles.cardsContainer}>

            <div key={id} className={styles.card}>
                <img
                    src={image}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/defaultImg.png";
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