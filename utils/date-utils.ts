import moment from "moment";
import "moment-timezone";
import "moment/locale/ru";
import "moment/locale/en-gb";

export default class DateUtils {

    static offset = new Date().getTimezoneOffset();

    static format = (timestamp: number | undefined | null, format: string = "MM DD, YYYY"): string => {
        const date = new Date((timestamp ?? 0) * 1000);

        return moment(date, format, "ru").utcOffset(0, true).format(format);
    }
    
}