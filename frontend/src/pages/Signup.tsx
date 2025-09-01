import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

const API_URL = "http://localhost:5000/api/auth";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // --- Step 1: Signup ---
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please check your email for OTP.");
        setEmailForOtp(formData.email);
        setShowOtpForm(true); // show OTP section instead of redirect
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error during signup.");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: Verify OTP ---
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailForOtp, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP verified successfully!");
        navigate("/notes"); // ✅ redirect to notes
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Server error during OTP verification.");
    } finally {
      setLoading(false);
    }
  };

  // --- Google Signup ---
  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formPanel}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <div className={styles.logo}></div>
            <span className={styles.logoText}>HD</span>
          </div>

          <h1 className={styles.title}>Sign up</h1>
          <p className={styles.subtitle}>Sign up to enjoy the feature of HD</p>

          {!showOtpForm ? (
            // --- Signup Form ---
            <form onSubmit={handleSignup}>
              {/* Name */}
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  Your Name
                </label>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.inputWithIcon}
                    placeholder="Jonas Khanwald"
                    required
                  />
                </div>
              </div>

              {/* DOB */}
              <div className={styles.inputGroup}>
                <label htmlFor="dob" className={styles.label}>
                  Date of Birth
                </label>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={styles.inputWithIcon}
                    placeholder="11 December 1997"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <div className={styles.inputContainer}>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.inputWithIcon}
                    placeholder="jonas_kahnwald@gmail.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <div className={styles.inputContainer}>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.inputWithIcon}
                    placeholder="Enter a strong password"
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? "Processing..." : "Get OTP"}
              </button>
            </form>
          ) : (
            // --- OTP Verification Form ---
            <form onSubmit={handleVerifyOtp}>
              <div className={styles.inputGroup}>
                <label htmlFor="otp" className={styles.label}>Enter OTP</label>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className={styles.inputWithIcon}
                    placeholder="6-digit code"
                    required
                  />
                </div>
              </div>
              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* Google Signup Button */}
          {!showOtpForm && (
            <button onClick={handleGoogleSignup} className={styles.googleButton}>
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className={styles.googleIcon}
              />
              Sign up with Google
            </button>
          )}

          <p className={styles.bottomLink}>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </div>
      <div className={styles.imagePanel}></div>
    </div>
  );
};

export default Signup;
