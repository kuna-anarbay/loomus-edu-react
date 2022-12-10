export default class FindStudentsQuery {
    query?: string | null;
    packageId: number | null;
    isActive: boolean | null;
    orderBy: string;
    orderDirection: string;
    page: number;
    size: number;
}