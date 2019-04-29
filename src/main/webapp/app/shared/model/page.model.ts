import {PageableModel} from "./pageable.model";
import {SortModel} from "./sort.model";

export class PageModel {
    public content ?: any[];
    public first ?: boolean;
    public last ?: boolean;
    public number ?: number;
    public numberOfElements ?: number;
    public pageable ?: PageableModel;
    public size ?: number;
    public sort ?: SortModel;
    public totalElements ?: number;
    public totalPages ?: number;

    constructor(
        content ?: any[],
        first ?: boolean,
        last ?: boolean,
        number ?: number,
        numberOfElements ?: number,
        pageable ?: PageableModel,
        size ?: number,
        sort ?: SortModel,
        totalElements ?: number,
        totalPages ?: number,
    ) {
        this.content = content ? content : null;
        this.first = first ? first : null;
        this.last = last ? last : null;
        this.number = number ? number : null;
        this.numberOfElements = numberOfElements ? numberOfElements : null;
        this.pageable = pageable ? pageable : null;
        this.size = size ? size : null;
        this.sort = sort ? sort : null;
        this.totalElements = totalElements ? totalElements : null;
        this.totalPages = totalPages ? totalPages : null;
    }
}
