export class AttendanceTableInfo {
    public result  ?: any[];
    public operator  ?: string;

    constructor(
        result ?: any[],
        operator ?: string,
    ) {
        this.result = result ? result : null;
        this.operator = operator ? operator : null;
    }
}
