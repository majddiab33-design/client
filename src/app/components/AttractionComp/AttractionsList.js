'use client';
import styles from "./AttractionsList.module.css";
import ResCard from "./AttractionsCard";
import Link from "next/link";

export default function AttractionsList({ attractions }) {
  return (
    <div className={styles.container}>
      {attractions.map((attraction) => {
        return (
          <Link href={`/Attractions/${attraction.attr_id}`} key={attraction.attr_id} className={styles.link} passHref>
            <ResCard
              key={attraction.attr_id}
              id={attraction.attr_id}
              name={attraction.attr_name}
              rate={attraction.attr_rate}
              image={attraction.attr_image}

            />
          </Link>
        );
      })};
    </div>
  );
}
