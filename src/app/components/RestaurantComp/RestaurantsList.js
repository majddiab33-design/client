'use client';
import styles from "./RestaurantsList.module.css";
import ResCard from "./RestaurantCard";
import Link from "next/link";

export default function RestaurantList({ restaurants }) {
  return (
    <div className={styles.container}>
      {restaurants.map((restaurant) => {
        return (

          <Link href={`/Restaurants/${restaurant.res_id}`} key={restaurant.res_id} className={styles.link} passHref>
            <ResCard
              key={restaurant.res_id}
              id={restaurant.res_id}
              name={restaurant.res_name}
              rate={restaurant.res_rate}
              image={restaurant.res_image}
            />
          </Link>
        );
      })};
    </div>
  );
}
