"use strict";

import * as functions from "firebase-functions";
import * as request from "request-promise";

const BASE_URL = "https://id.twitch.tv";
const OAUTH2_BASE_URL = `${BASE_URL}/oauth2`;

// Configuration provided by Firebase
const config = functions.config().eurybie_live;

class TwitchAuth {
    private __token: string;

    constructor() {
        this.__token = "";
    }

    get TOKEN() {
        return this.__token;
    }

    /**
     * Generate a new token from Twitch API
     * @returns {void}
     */
    async generateToken() {
        try {
            const data = await request.post({
                url: `${OAUTH2_BASE_URL}/token?client_id=${config.client_id}&client_secret=${config.client_secret}&grant_type=client_credentials`,
                json: true
            });
            this.__token = data.access_token;
            console.log("Got token from Twitch API");
        } catch (_err) {
            console.error(`Error while generating a token from Twitch API - ${_err.message}`);
        }
    }

    /**
     * Revoke the current token from Twitch API
     * @returns {void}
     */
    async revokeToken() {
        // Revoke only if the token exists
        if (this.__token) {
            try {
                await request.post({
                    url: `${OAUTH2_BASE_URL}/revoke?client_id=${config.client_id}&token=${this.__token}`,
                    headers: {"Authorization": `OAuth ${this.__token}`},
                    json: true
                });
                console.log("Revoked token from Twitch API");
            } catch (_err) {
                console.error(`Error while revoking the token from Twitch API - ${_err.message}`);
            }
        }
    }

    /**
     * Validate the current token from Twitch API
     * @returns {void}
     */
    async validateToken() {
        try {
            await request.get({
                url: `${OAUTH2_BASE_URL}/validate`,
                headers: {"Authorization": `OAuth ${this.__token}`},
                json: true
            });
            console.log("Token from Twitch API is validated");
        } catch (_err) {
            // 401 Error, we generate a new Token
            if (_err.statusCode === 401) {
                await this.generateToken();
            }
        }
    }
}

export default TwitchAuth;
