import randomString from "randomstring";

// Strings
export const JWT_SECRET = process.env.JWT_SECRET || randomString.generate(100);
export const CLIENT_ID = process.env.VITE_CLIENT_ID;
export const CLIENT_SECRET = process.env.VITE_CLIENT_SECRET;

// Numbers
export const pwdSaltRounds = 12;

// Cookie Properties
export const cookieProps = Object.freeze({
  key: "jid",
  secret: process.env.COOKIE_SECRET, // in case we'd need to sign cookies
  options: {
    httpOnly: true,
    maxAge: Number(8 * 60 * 60 * 1000),
  },
});
