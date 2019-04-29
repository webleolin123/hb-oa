export class ClfRegisterModel {
    public id?: any;
    public taoBaoId?: any;
    public orderId?: any;
    public telephone?: number;
    public problemType?: number;
    public helpType?: number;
    public problemInstruction?: string;
    public remarks?: string;
    public treatment?: string;
    public actionType?: number;
    public list?: any;
    public image?: any;
    public imageArr?: any;
    public createdDate?: any;
    public status?: any;

    constructor(
        id?:any,
        taoBaoId?: any,
        orderId?: any,
        telephone?: number,
        problemType?: number,
        helpType?: number,
        problemInstruction?: string,
        remarks?: string,
        treatment?: string,
        actionType?: number,
        list?: any,
        image?: any,
        imageArr?: any,
        createdDate?:any,
        status?:any,
    ) {
        this.id = id ? id : null;
        this.taoBaoId = taoBaoId ? taoBaoId : null;
        this.orderId = orderId ? orderId : null;
        this.telephone = telephone ? telephone : null;
        this.problemType = problemType ? problemType : null;
        this.helpType = helpType ? helpType : null;
        this.problemInstruction = problemInstruction ? problemInstruction : null;
        this.remarks = remarks ? remarks : null;
        this.treatment = treatment ? treatment : null;
        this.actionType = actionType ? actionType : null;
        this.list = list ? list : null;
        this.image = image ? image : null;
        this.imageArr = imageArr ? imageArr : null;
        this.createdDate = createdDate ? createdDate : null;
        this.status = status ? status : null;
    }
}
