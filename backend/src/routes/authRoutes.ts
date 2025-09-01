import { Router } from "express";
import { signup, verifyOtp, signin } from "../controllers/authController";
import passport from "../services/passport";
import User from "../models/User";

const router = Router();

// Existing routes (untouched)
router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/signin", signin);

// === Google Auth Routes ===

// Step 1: Redirect to Google for authentication
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/signup" }),
  (req, res) => {
    // ✅ Redirect after success
    res.redirect("http://localhost:5173/notes");
  }
);

// Current user
router.get("/me", (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }
  res.status(401).json({ message: "Not logged in" });
});
router.get("/user/:name", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
