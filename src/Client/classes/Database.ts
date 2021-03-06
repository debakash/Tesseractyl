import { DatabaseAttributes } from "../../types";
import * as fetch from "node-fetch";

export class Database {
    private readonly serverid: string;
    private readonly id: string;
    private readonly url: string;
    private readonly apikey: string;
    public readonly attributes: DatabaseAttributes;

    constructor(serverId: string, databaseId: string, serverURL: string, apiKey: string, data: DatabaseAttributes) {
        this.serverid = serverId;
        this.id = databaseId;
        this.url = `${serverURL}/databases/${databaseId}`;
        this.apikey = apiKey;

        this.attributes = data;
    }

    rotatePassword(): Promise<string> {
        return new Promise((resolve, reject) => {
            fetch
                .default(`${this.url}/rotate-password`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.apikey}`
                    }
                })
                .then(async (res) => {
                    const json = await res.json();
                    if (res.status === 200) {
                        return resolve(json.attributes.relationships.password.attributes.password);
                    } else {
                        if (json.errors) {
                            return reject(new Error(`${json.errors[0].code}: ${json.errors[0].detail}`));
                        } else {
                            reject();
                        }
                    }
                })
                .catch(reject);
        });
    }

    public delete(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch
                .default(`${this.url}`, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.apikey}`
                    }
                })
                .then(async (res) => {
                    if (res.status === 204) {
                        return resolve(true);
                    } else {
                        const json = await res.json();
                        if (json.errors) {
                            return reject(new Error(`${json.errors[0].code}: ${json.errors[0].detail}`));
                        } else {
                            reject();
                        }
                    }
                })
                .catch(reject);
        });
    }
}
