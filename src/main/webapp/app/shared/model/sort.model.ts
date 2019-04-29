export class SortModel {
    public sorted ?: boolean;
    public unsorted ?: boolean;

    constructor(
        sorted ?: any,
        unsorted ?: any,
    ) {
        this.sorted = sorted ? sorted : null;
        this.unsorted = unsorted ? unsorted : null;
    }
}
