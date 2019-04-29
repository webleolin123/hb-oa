export class DictManageModel {
// 系统设置
    // 数据字典
    public id ?: number;
    public name ?: string;
    public value ?: string;
    public description ?: string;
    public seq ?: number;
    public remark ?: string;
    public status ?: number;

    constructor(
        id ?: number,
        name ?: string,
        value ?: string,
        description ?: string,
        seq ?: number,
        remark ?: string,
        status ?: number,
    ) {
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.value = value ? value : null;
        this.name = name ? name : null;
        this.description = description ? description : null;
        this.seq = seq ? seq : null;
        this.remark = remark ? remark : null;
        this.status = status ? status : null;
    }
}
