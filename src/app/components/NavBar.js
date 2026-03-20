'use client'
import { useState } from "react";
import styles from "./NavBar.module.css";
import { usePathname } from "next/navigation";
import LogIn from "./LogIn/LogIn";
import AddRecommendation from "./Recommendation/AddRecommendation";

export default function NavBar() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return (
        <div>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.logo}>
                        <div className={styles.logoBadge}>EX</div>
                        <span>ExploreIt</span>
                    </div>

                    <div className={styles.navLinks}>
                        <a href="/" className={pathname === "/" ? styles.active : ""}>דף הבית</a>
                        <a href="/Restaurants" className={pathname === "/Restaurants" ? styles.active : ""}>מסעדות</a>
                        <a href="/Trips" className={pathname === "/Trips" ? styles.active : ""}>טיולים</a>
                        <a href="/Attractions" className={pathname === "/Attractions" ? styles.active : ""}>אטרקציות</a>
                    </div>

                    <div className={styles.navCta}>
                        <LogIn setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
                        <AddRecommendation isLoggedIn={isLoggedIn} />
                    </div>
                </nav>
            </header>
        </div>
    );
}