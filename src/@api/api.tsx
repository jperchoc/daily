class Api {
    url: string;
    constructor() {
        this.url = "http://localhost:3004";
    }

    async getActivities() {
        const res = await fetch(this.url + "/activities");
        return await res.json();
    }

    async getActivityByDateOrDefault(date: string) {
        const dailies = await this.getActivityByDate(date);
        if (dailies.length > 0) {
            return dailies[0];
        } else {
            return await this.postActivity(date, "");
        }
    }

    async getActivityByDate(date:string) {
        const res = await fetch(this.url + "/activities?date=" + date);
        return await res.json();
    }

    async postActivity(date: string, content: string) {
        const res = await fetch(this.url + "/activities", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ date, content })
        });
        return await res.json();
    }

    async putActivity(id: number, date: string, content: string) {
        const res = await fetch(this.url + "/activities/" + id, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({ id, date, content })
        });
        return await res.json();
    }

    async getPersons() {
        const res = await fetch(this.url + "/persons");
        return await res.json();
    }
}
export default new Api();