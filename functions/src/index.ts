"use strict";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";

import TwitchAuth from "./TwitchAuth";
import WebhookApp from "./WebhookApp";

admin.initializeApp(functions.config().firebase);

const twitchAuth: TwitchAuth = new TwitchAuth();
const webhookApp: WebhookApp = new WebhookApp(twitchAuth);
webhookApp.init();

// (async () => {
//     await twitchAuth.generateToken();
//     await twitchAuth.validateToken();
//     await twitchAuth.revokeToken();
//     await twitchAuth.validateToken();
//     await twitchAuth.validateToken();
// })();

// Main application that embedded our functions to the endpoint "/webhook"
const main: express.Express = express();
main.use("/webhook", webhookApp.express);
// Ensure to handle only JSON requests
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

// webhook represents all exposed functions
export const webhook: functions.HttpsFunction = functions.https.onRequest(main);
