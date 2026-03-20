'use client';
import styles from "./TripList.module.css";
import ResCard from  "./TripCard";
import Link from "next/link";

export default function TripList({ trips }) {
  return (
    <div className={styles.container}>
      {trips.map((trip) => {
        return (
          <Link href={`/Trips/${trip.trip_id}`} key={trip.trip_id} className={styles.link} passHref>
          <ResCard
            key={trip.trip_id}
            id={trip.trip_id}
            name={trip.trip_name}
            rate={trip.trip_rate}
            image={trip.trip_image}
          />
          </Link>
        );      
      })};
    </div>
  );
}
