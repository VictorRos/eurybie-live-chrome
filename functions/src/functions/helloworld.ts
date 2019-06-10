"use strict";

import * as functions from "firebase-functions";
import express = require("express");

import TwitchAuth from "../TwitchAuth";

const app = express();
const twitchAuth = new TwitchAuth();

app.get("/helloworld", (_request: express.Request, _response: express.Response) => {
    twitchAuth.generateToken();
    _response.send("Hello from Firebase!");
});

export default functions.https.onRequest(app);
