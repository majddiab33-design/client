'use client';
import styles from './highRate.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HighRate() {
    const endpoints = ["restaurant", "attraction", "trip"];
    const [type, setType] = useState(null);
    const [highRateData, setHighRateData] = useState(null);
    const router = useRouter();

    const goToItemDetails = () => {
        if (highRateData) {
            if (type === "restaurant") {
                router.push(`/Restaurants/${highRateData.id}`);
            } else if (type === "attraction") {
                router.push(`/Attractions/${highRateData.id}`);
            } else if (type === "trip") {
                router.push(`/Trips/${highRateData.id}`);
            }

        }
    };

    useEffect(() => {
        const searchHighRate = async () => {
            let best = null;

            for (const endpoint of endpoints) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}/highRate`);
                const data = await response.json();

                let item = null;

                if (endpoint === "restaurant") {
                    item = {
                        id: data.res_id,
                        rate: parseFloat(data.res_rate),
                        name: data.res_name,
                        description: data.res_description
                    };
                } else if (endpoint === "attraction") {
                    item = {
                        id: data.attr_id,
                        rate: parseFloat(data.attr_rate),
                        name: data.attr_name,
                        description: data.attr_description
                    };
                } else if (endpoint === "trip") {
                    item = {
                        id: data.trip_id,
                        rate: parseFloat(data.trip_rate),
                        name: data.trip_name,
                        description: data.trip_description
                    };
                }

                if (!best || item.rate > best.rate) {
                    best = item;
                    setType(endpoint);
                }
            }

            setHighRateData(best);
        };

        searchHighRate();
    }, []);

    return (
        <div className={styles.highRate}>
            <aside className={styles.heroCard}>
                <div className={styles.heroCardHeader}>
                    <span className={styles.badge}>המלצה חמה</span>
                    <div className={styles.rating}>
                        <span className={styles.star}>★</span>
                        <span>{highRateData?.rate.toFixed(1) || 'N/A'}</span>
                    </div>
                </div>

                <h3>{highRateData?.name || 'שם המסעדה'}</h3>
                <p className={styles.description}>{highRateData?.description || 'תיאור קצר של המסעדה'}</p>

                <div className={styles.heroCardFooter}>
                    <span>פתוח עד 23:30</span>
                    <button className={styles.btnOutline} onClick={goToItemDetails}>
                        לפרטים
                    </button>
                </div>
            </aside>
        </div>
    );
}