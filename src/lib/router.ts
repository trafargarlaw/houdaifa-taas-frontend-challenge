require("dotenv").config({ path: ".env.local" });
import express from "express";

import axios from "axios";

const router = express.Router();

router.get("/auth/", async (req, res) => {
  const { query } = req;
  const { code } = query;
  if (!code) {
    return res.send({
      success: false,
      message: "Error no code",
    });
  }

  const result = await axios({
    url: "https://github.com/login/oauth/access_token",
    data: {
      code: code,
      client_id: process.env.VITE_CLIENT_ID,
      client_secret: process.env.VITE_CLIENT_SECRET,
    },
    headers: {
      Accept: "application/json",
    },
    method: "POST",
  });
  res.json(result.data);
});

export default router;
