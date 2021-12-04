class Daily {
    id?: number;
    date: Date;
    content: string;
    constructor(id: number, date: Date, content: string) {
        this.id = id;
        this.date = date;
        this.content = content;
    }

    getDateString():string {
        const date = ('0' + this.date.getDate()).slice(-2);
        const month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        const year = this.date.getFullYear();
        return `${month}/${date}/${year}`;
    }
}

export default Daily;