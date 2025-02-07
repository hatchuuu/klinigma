import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id"); // Set locale ke bahasa Indonesia

export const getDay = (date) => {
    return dayjs(date).format("dddd").toLowerCase();
}

export const getDate = (date) => {
    return dayjs(date).format("DD MMMM YYYY");
}

export const getFullDate = (date) => {
    return getDay(date) + ", " + getDate(date);
}
export const getTableDate = (date) => {
    return dayjs(date).format("DD MMM YY");
}

export const getCurrentISODate = () => {
    const today = dayjs();
    return {
        date: today.format("DD MMM YYYY"),
        day: today.format("dddd").toLowerCase(),
        dateISO: today.format("MM-DD-YYYY"),
    }
}

export const getDateByNumber = (num) => {
    const today = dayjs();
    const data = Array.from(
        { length: Number(num) },
        (_, i) => {
            const date = today.add(i, "day");
            return {
                date: date.format("DD MMM YYYY"),
                day: date.format("dddd").toLowerCase(),
                dateISO: date.format("MM-DD-YYYY"),
            }
        }
    );
    return data;
}

export const getFullDateByQueue = (date) => {
    return dayjs(date, "DD-MM-YYYY").format("dddd, DD MMMM YYYY");
}
export const getDayByQueue = (date) => {
    return dayjs(date, "DD-MM-YYYY").format("dddd").toLowerCase();
}

export const isLateHour = (maxTime) => {
    const [hour, minute] = maxTime.split(":").map(Number);
    const maxHour = dayjs().hour(hour).minute(minute);
    const currentHour = dayjs();
    return currentHour.isBefore(maxHour);
};

export const getFullHourDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY HH:mm");
}