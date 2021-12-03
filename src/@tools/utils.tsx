import moment from "moment";

function shuffleArray<T>(array: Array<T>): Array<T>{
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

function setDateOnly(dateToFormat: Date): string {
    const t = dateToFormat;
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    return `${month}/${date}/${year}`;
}

export { 
    shuffleArray,
    setDateOnly
};
