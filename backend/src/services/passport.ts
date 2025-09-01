import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!, // must match your Google Console
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails?.[0].value });

        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails?.[0].value,
            isVerified: true,
          });
          await user.save();
        }

        done(undefined, user); // ✅ no null
      } catch (err) {
        done(err as any, undefined); // ✅ no null
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  if (!user) return done(new Error("User not found"), undefined);
  done(undefined, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    done(undefined, user);
  } catch (err) {
    done(err as any, undefined);
  }
});

export default passport;
