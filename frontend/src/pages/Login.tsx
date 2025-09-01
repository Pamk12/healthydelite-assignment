import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signin.module.css";

const MailIcon = () => <span className={styles.icon}>✉️</span>;
const OtpIcon = () => <span className={styles.icon}>🔑</span>;

const API_URL = "http://localhost:5000/api/auth";

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "otp">("email");

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    keepSignedIn: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  // OTP request
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      alert("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login-request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("OTP sent to your email 📩");
        setStep("otp");
      } else {
        alert(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while requesting OTP.");
    } finally {
      setLoading(false);
    }
  };

  // OTP verify
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otp) {
      alert("Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login-verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Sign in successful! 🎉");
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "profile",
          JSON.stringify({ name: data.name, email: data.email })
        );
        if (formData.keepSignedIn) {
          localStorage.setItem("keepSignedIn", "true");
        }
        navigate("/notes");
      } else {
        alert(data.message || "OTP verification failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Sign In
  const handleGoogleSignin = () => {
    window.location.href = `${API_URL}/google`; // backend handles redirect
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.signinBox}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <div className={styles.logo}></div>
            <span className={styles.logoText}>HD</span>
          </div>

          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.subtitle}>
            Please login to continue to your account.
          </p>

          {step === "email" && (
            <form onSubmit={handleRequestOtp}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <div className={styles.inputContainer}>
                  <MailIcon />
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

              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>
              <div className={styles.inputGroup}>
                <label htmlFor="otp" className={styles.label}>
                  OTP
                </label>
                <div className={styles.inputContainer}>
                  <OtpIcon />
                  <input
                    type="text"
                    id="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    className={styles.inputWithIcon}
                    placeholder="Enter OTP"
                    required
                  />
                </div>
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="keepSignedIn"
                  checked={formData.keepSignedIn}
                  onChange={handleChange}
                />
                <label htmlFor="keepSignedIn">Keep me logged in</label>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Sign in"}
              </button>

              <p className={styles.resendLink}>
                Didn’t get OTP?{" "}
                <span onClick={() => setStep("email")}>Resend OTP</span>
              </p>
            </form>
          )}

          {/* 🔹 Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignin}
            className={styles.googleButton}
          >
            Continue with Google
          </button>

          <p className={styles.signInLink}>
            Need an account? <Link to="/">Create one</Link>
          </p>
        </div>
        <div className={styles.imageWrapper}></div>
      </div>
    </div>
  );
};

export default Signin;
