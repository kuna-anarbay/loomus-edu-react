export default class Paginate<T> {
    total: number;
    data: T[];

    static empty = <T>(): Paginate<T> => {
        return {
            total: 0,
            data: []
        }
    }
}