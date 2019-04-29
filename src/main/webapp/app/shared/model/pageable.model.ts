import {SortModel} from "./sort.model";

export class PageableModel {
    public offset ?: number;
    public pageNumber ?: number;
    public pageSize ?: number;
    public paged ?: boolean;
    public sort ?: SortModel;
    public unpaged ?: boolean;

    constructor(
        offset ?: number,
        pageNumber ?: number,
        pageSize ?: number,
        paged ?: boolean,
        sort ?: SortModel,
        unpaged ?: boolean,
    ) {
        this.offset = offset ? offset : null;
        this.pageNumber = pageNumber ? pageNumber : null;
        this.pageSize = pageSize ? pageSize : null;
        this.paged = paged ? paged : null;
        this.sort = sort ? sort : null;
        this.unpaged = unpaged ? unpaged : null;
    }
}
