"use strict";

import * as functions from "firebase-functions";
import fetch from "node-fetch";

const BASE_URL = "https://id.twitch.tv";
const OAUTH2_BASE_URL = `${BASE_URL}/oauth2`;

// Configuration provided by Firebase
const config = functions.config().eurybie_live;

class TwitchAuth {
    private __token: string;

    constructor() {
        this.__token = "";
    }

    get token() {
        return this.__token;
    }

    set token(_token) {
        this.__token = _token;
    }

    async revokeToken() {
        // Revoke only if the token exists 
        if (this.__token) {
            try {
                await fetch(
                    `${OAUTH2_BASE_URL}/revoke?client_id=${config.client_id}&token=${this.__token}`,
                    {method: "POST"}
                );
                console.log("Revoked token from Twitch API");
            } catch (_err) {
                console.error(`Error while revoking the token from Twitch API - ${_err.message}`);
            }
        }
    }

    async generateToken() {
        try {
            const response = await fetch(
                `${OAUTH2_BASE_URL}/token?client_id=${config.client_id}&client_secret=${config.client_secret}&grant_type=client_credentials`,
                {method: "POST"}
            );
            if (response.ok) {
                const json = await response.json();
                this.__token = json.access_token;
                console.log("Got token from Twitch API");
            }
        } catch (_err) {
            console.error(`Error while generating a token from Twitch API - ${_err.message}`);
        }
    }
}

export default TwitchAuth;
