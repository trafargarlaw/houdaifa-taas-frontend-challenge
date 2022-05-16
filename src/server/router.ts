require("dotenv").config({ path: ".env.local" });
import express from "express";
import axios from "axios";
import { JwtService } from "./jwtService";
import { CLIENT_ID, CLIENT_SECRET, cookieProps } from "./constants";
import { checkJwt } from "./middlewares/checkJwt";
const router = express.Router();

const jwtService = new JwtService();

router.get("/auth/", async (req, res) => {
  const { query } = req;
  const { code } = query;
  if (!code) {
    return res.status(401).send();
  }

  const result = await axios({
    url: "https://github.com/login/oauth/access_token",
    data: {
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    },
    headers: {
      Accept: "application/json",
    },
    method: "POST",
  });
  if (result.data.error) {
    return res.status(401).send();
  }
  const jwt = await jwtService.getJwt({
    token: result.data.access_token,
  });
  const { key, options } = cookieProps;

  res.cookie(key, jwt, options);
  return res.send({
    success: true,
    message: "successful login",
  });
});

router.get("/user/", [checkJwt], async (req: any, res: any) => {
  const token = res.locals.jwtPayload;
  try {
    let result = await axios({
      url: "https://api.github.com/user",
      headers: {
        Authorization: `token ${token}`,
      },
      method: "GET",
    });
    return res.json(result.data);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
router.get("/checkToken/", [checkJwt], async (req: any, res: any) => {
  const token = res.locals.jwtPayload;
  if (token) {
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});
router.get("/repos/", [checkJwt], async (req: any, res: any) => {
  const token = res.locals.jwtPayload;
  try {
    let { data } = await axios({
      url: "https://api.github.com/user/repos",
      headers: {
        Authorization: `token ${token}`,
      },
      method: "GET",
    });
    return res.json(data);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
router.get(
  "/repos/:username/:repository/branches/",
  [checkJwt],
  async (req: any, res: any) => {
    const token = res.locals.jwtPayload;
    let userLogin = req.params.username;
    let repository = req.params.repository;
    try {
      let { data } = await axios({
        url: `https://api.github.com/repos/${userLogin}/${repository}/branches`,
        headers: {
          Authorization: `token ${token}`,
        },
        method: "GET",
      });
      res.json(data);
    } catch (err) {
      res.send({
        success: false,
        message: err.message,
      });
    }
  }
);
router.get(
  "/repos/:username/:repository/commits/",
  [checkJwt],
  async (req: any, res: any) => {
    const token = res.locals.jwtPayload;
    let userLogin = req.params.username;
    let repository = req.params.repository;
    let branch = req.query.sha;
    let page = req.query.page;
    try {
      let { data } = await axios({
        url: `https://api.github.com/repos/${userLogin}/${repository}/commits?sha=${branch}&page=${
          page || 1
        }`,
        headers: {
          Authorization: `token ${token}`,
        },
        method: "GET",
      });
      res.json(data);
    } catch (err) {
      res.send({
        success: false,
        message: err.message,
      });
    }
  }
);
router.get("/logout", async (req, res) => {
  const { key } = cookieProps;
  res.clearCookie(key);
  return res.status(200).end();
});

export default router;
