export default class StringUtils {

    static replace = (value: string, ...args: string[]): string => {
        let result = value;
        args.forEach(arg => {
            result = result.replace("%s", arg)
        });

        return result;
    }


    static fullName = ({ firstName, lastName }: { firstName: string, lastName?: string | null }): string => {
        if (lastName) {
            return `${firstName} ${lastName}`
        }

        return firstName;
    }

    static resourcesCount = (count: number) => {
        if (count == 1) return "count.resource";
        if (count > 0 && count < 5) return "count.resourcesCount4";

        return "count.resourcesCount";
    }

    static resultsCount = (count: number) => {
        if (count > 0 && count % 10 === 1) return "count.result";
        if ([11, 12, 13, 14].includes(count)) return "count.resultsCount";
        if (count > 0 && count % 10 < 5) return "count.resultsCount4";

        return "count.resultsCount";
    }

    static lessonsCount = (count: number) => {
        if (count == 1) return "count.lesson";
        if (count > 0 && count < 5) return "count.lessonsCount4";

        return "count.lessonsCount";
    }

}