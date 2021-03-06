import { ServerAllocationAttributes } from "../../types";
import * as fetch from "node-fetch";

export class Allocation {
    private readonly serverid: string;
    private readonly id: string;
    private readonly url: string;
    private readonly apikey: string;
    public readonly attributes;

    constructor(
        serverId: string,
        allocationId: string,
        serverURL: string,
        apiKey: string,
        data: ServerAllocationAttributes
    ) {
        this.serverid = serverId;
        this.id = allocationId;
        this.url = `${serverURL}/network/allocations/${allocationId}`;
        this.apikey = apiKey;

        this.attributes = data;
    }

    public setNote(note: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch
                .default(`${this.url}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.apikey}`
                    },
                    body: JSON.stringify({
                        notes: note
                    })
                })
                .then(async (res) => {
                    const json = await res.json();
                    if (res.status === 200) {
                        return resolve(true);
                    } else {
                        if (json.errors) {
                            return reject(new Error(`${json.errors[0].code}: ${json.errors[0].detail}`));
                        } else {
                            reject(json);
                        }
                    }
                })
                .catch(reject);
        });
    }

    public setPrimary(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch
                .default(`${this.url}/primary`, {
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
                        return resolve(true);
                    } else {
                        if (json.errors) {
                            return reject(new Error(`${json.errors[0].code}: ${json.errors[0].detail}`));
                        } else {
                            reject(json);
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
                            reject(json);
                        }
                    }
                })
                .catch(reject);
        });
    }
}
