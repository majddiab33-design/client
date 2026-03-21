"use client";
import { useState, useEffect } from "react";
import styles from "./LogIn.module.css";

export default function Home({ setIsLoggedIn, isLoggedIn }) {
  const [showModal, setShowModal] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [newUserInfo,setNewUserInfo] = useState({ user_name: "", user_password: "", user_email: "" });
  const [userInfo, setUserInfo] = useState({ user_name: "", user_password: "", user_email: "" });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: userInfo.user_email,
          password: userInfo.user_password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      if (res.ok) {
        localStorage.setItem("token", data.token);
      }

      setIsLoggedIn(true);
      setShowModal(false);
      setUser(data.user);


    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newUserInfo.user_email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newUserInfo),
      });

      const data = await res.json();
      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);

      if (!res.ok) {
        alert(data.error || "sign up failed");
        return;
      }

      alert("Sign up successful! You can now log in.");

      setShowSignUp(false);
      setShowModal(true);


      setUser(data.user);

    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div >
      {!isLoggedIn && (
        <button className={styles.btnOutline} onClick={() => setShowModal(true)}>
          התחברות
        </button>
      )}

      {showSignUp && (
        <div className={styles.overlayStyle}>
          <div className={styles.modalStyle}>
            <button className={styles.closeButton}  onClick={() => window.location.reload()}>
              X
            </button>
            <h2>sign up to continue</h2>

            <input type="text" placeholder="Email" value={newUserInfo.user_email} onChange={(e) => setNewUserInfo({ ...newUserInfo, user_email: e.target.value })} />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="text" placeholder="Username" value={newUserInfo.user_name} onChange={(e) => setNewUserInfo({ ...newUserInfo, user_name: e.target.value })} />
            <input type="password" placeholder="Password" value={newUserInfo.user_password} onChange={(e) => setNewUserInfo({ ...newUserInfo, user_password: e.target.value })} />
            <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>


          </div>
        </div>
      )}

      {showModal && (
        <div className={styles.overlayStyle}>
          <div className={styles.modalStyle}>
            <button className={styles.closeButton}  onClick={() => window.location.reload()}>
              X
            </button>
            <h2>log in to continue</h2>

            <input type="text" placeholder="Email" value={userInfo.user_email} onChange={(e) => setUserInfo({ ...userInfo, user_email: e.target.value })} />
            <input type="password" placeholder="Password" value={userInfo.user_password} onChange={(e) => setUserInfo({ ...userInfo, user_password: e.target.value })} />
            <a href="#" onClick={() => { setShowSignUp(true); setShowModal(false); }}>Don't have an account? Sign up</a>
            <button onClick={handleLogin} className={styles.submitButton}>Submit</button>

          </div>
        </div>
      )}
    </div>
  );
}