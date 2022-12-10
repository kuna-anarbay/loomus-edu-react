export default class NumberUtils {

    static phoneNumber = (value: string, limit?: number): string => {
        const digits = this.digits(value, limit);

        return digits.length === 11 ? `7${digits.substring(1)}` : digits;
    }

    static digits = (value: string, limit?: number): string => {
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const digits = value.split("").filter(c => numbers.includes(c)).join("");
        if (limit) {
            return digits.substring(0, limit);
        }

        return digits;
    }


    static maskedPhone = (value: string | null | undefined): string => {
        if (!value || value.length === 0) return "";
        const digits = this.digits(value).split("");
        const mask = "+X (XXX) XXX-XX-XX".split("")
        let result = ""
        let index = 0;
        for (let char in mask) {
            if (index < digits.length) {
                if (char === "X") {
                    result += digits[index];
                    index++;
                } else {
                    result += char;
                }
            }
        }

        return result;
    }

}