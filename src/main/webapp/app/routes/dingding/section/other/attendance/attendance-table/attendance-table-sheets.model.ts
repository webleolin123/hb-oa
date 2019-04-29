export class AttendanceTableSheetsModel {
    public head ?: any[];
    public bodys ?: any[];
    public  key ?: string;
    public widthConfig ?: any[];
    public nzScroll?: {
        x: string | null;
        y: string | null;
    };
    constructor(
        head ?: any[],
        bodys ?: any[],
        key ?:string,
        widthConfig ?: any[],
        nzScroll?: {
            x: string | null;
            y: string | null;
        },
    ) {
        this.head = head ? head : null;
        this.bodys = bodys ? bodys : null;
        this.key = key ? key : null;
        this.widthConfig = widthConfig ? widthConfig : null;
        this.nzScroll = nzScroll ? nzScroll : null;
    }
}
