'use client';
import styles from "./Search.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

   const handleSearch = async () => {
    const endpoints = ["restaurant", "attraction", "trip"];
    

    for (const endpoint of endpoints) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}/${searchTerm}`);

        if (response.ok) {
            const data = await response.json();

            console.log(`Found in ${endpoint}:`, data);
            if (endpoint === "restaurant") {
                router.push(`/Restaurants/${data.res_id}`);
                
            }
            else if (endpoint === "attraction") {
                router.push(`/Attractions/${data.attr_id}`);
            }
            else if (endpoint === "trip") {
                router.push(`/Trips/${data.trip_id}`);
            }
            
        }
    }

    console.log("No results found");
};

    return (
        <div className={styles.heroSearch}>
            <div className={styles.heroSearchTop}>
                <input
                    type="text"
                    placeholder="לאן בא לך ללכת היום?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <button className={styles.btnPrimary} onClick={handleSearch}>
                   חפש
                </button>
            </div>

            <div className={styles.heroFilters}>
                <span className={`${styles.filter} ${styles.activeFilter}`}>
                    קרוב אליי
                </span>
                <span className={styles.filter}>פתוח עכשיו</span>
                <span className={styles.filter}>משפחות</span>
                <span className={styles.filter}>רומנטי</span>
                <span className={styles.filter}>תקציב נמוך</span>
            </div>
        </div>
    );
}