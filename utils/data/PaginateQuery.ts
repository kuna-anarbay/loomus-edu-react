export default class PaginateQuery {
    page: number;
    size: number;

    static initial = (): PaginateQuery => {
        return {
            page: 0,
            size: 10
        }
    }
}