import styles from "./AddRecommendation.module.css";
import { useState } from "react";

export default function AddRecommendation({isLoggedIn}) {
  const [recomType, setRecomType] = useState("");
  const [showMassage, setShowMassage] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    rate: "",
    description: "",
    image: "https://placehold.co/400",
  });

  const handleTypeChange = (type) => {
    setRecomType(type);

    // איפוס הטופס כשמחליפים סוג
    setFormData({
      name: "",
      rate: "",
      description: "",
      image: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecom = async () => {
    let content = {};

    if (recomType === "restaurant") {
      content = {
        res_name: formData.name,
        res_rate: formData.rate,
        res_description: formData.description,
        res_image: formData.image || "/defaultImg.png",
      };
    }

    if (recomType === "attraction") {
      content = {
        attr_name: formData.name,
        attr_rate: formData.rate,
        attr_description: formData.description,
        attr_image: formData.image || "/defaultImg.png",
      };
    }

    if (recomType === "trip") {
      content = {
        trip_name: formData.name,
        trip_rate: formData.rate,
        trip_description: formData.description,
        trip_image: formData.image || "/defaultImg.png",
      };
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${recomType}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error");
        return;
      }

      alert("Added successfully 🎉");
      setShowMassage(false);
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoggedIn && (
      <button
        className={styles.btnPrimary}
        onClick={() => setShowMassage(true)}
      >
        הוסף המלצה
      </button>
      )}

      {!isLoggedIn && (
        <button
          className={styles.btnPrimary}
          onClick={() => alert("אנא התחבר כדי להוסיף המלצה")}
        >
          הוסף המלצה
        </button>
      )}

      {showMassage && (
        <div className={styles.overlayStyle}>
          <div className={styles.container}>
            <h1>הוספת המלצה</h1>
            <button className={styles.closeButton} onClick={() => setShowMassage(false)}>
              X
            </button>

            <div className={styles.form}>
              <label className={styles.title}>סוג:</label>

              <label className={styles.radioCard}>
                <input
                  type="radio"
                  name="type"
                  value="restaurant"
                  checked={recomType === "restaurant"}
                  onChange={() => handleTypeChange("restaurant")}
                />
                <span>🍽 מסעדות</span>
              </label>

              <label className={styles.radioCard}>
                <input
                  type="radio"
                  name="type"
                  value="attraction"
                  checked={recomType === "attraction"}
                  onChange={() => handleTypeChange("attraction")}
                />
                <span>🎡 אטרקציות</span>
              </label>

              <label className={styles.radioCard}>
                <input
                  type="radio"
                  name="type"
                  value="trip"
                  checked={recomType === "trip"}
                  onChange={() => handleTypeChange("trip")}
                />
                <span>🌄 טיולים</span>
              </label>
            </div>

            {recomType && (
              <div className={styles.contentForm}>
                <input
                  type="text"
                  name="name"
                  placeholder="שם"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="rate"
                  placeholder="דירוג"
                  value={formData.rate}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="description"
                  placeholder="תיאור"
                  value={formData.description}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="image"
                  placeholder="תמונה (לא חובה)"
                  value={formData.image}
                  onChange={handleChange}
                />

                <button
                  className={styles.addButton}
                  onClick={handleRecom}
                >
                  הוסף
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}