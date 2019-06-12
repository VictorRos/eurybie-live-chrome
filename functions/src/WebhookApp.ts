"use strict";

import * as express from "express";

import TwitchAuth from "./TwitchAuth";

export default class WebhookApp {
    private __twitchAuth: TwitchAuth;
    private __express: express.Express;

    constructor(_twitchAuth: TwitchAuth) {
        this.__twitchAuth = _twitchAuth;
        this.__express = express();
    }

    /**
     * Get Express app that contains the webhook endpoint functions
     */
    get express() {
        return this.__express;
    }

    /**
     * Initialize webhook express app
     * @returns {void}
     */
    init() {
        this.__subscribe();
        this.__message();
        this.__unsubscribe();
    }

    /**
     * Subscribe to a webhook from Twitch API
     * @returns {void}
     */
    private __subscribe() {
        this.__express.get("/subscribe", (_request: express.Request, _response: express.Response) => {
            _response.send("Subscribe!");
        });
    }

    /**
     * Get all messages coming from webhooks of Twitch API
     * @returns {void}
     */
    private __message() {
        this.__express.get("/message", (_request: express.Request, _response: express.Response) => {
            _response.send("Message!");
        });
    }

    /**
     * Unsubscribe to a webhook from Twitch API
     * @returns {void}
     */
    private __unsubscribe() {
        this.__express.get("/unsubscribe", (_request: express.Request, _response: express.Response) => {
            _response.send("Unsubscribe!");
        });
    }
}
