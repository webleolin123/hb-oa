export class ActionProcess {
    public id ?: any;
    public actionDesc ?: string;
    public actionLevel ?: any;
    public actionTime ?: string;
    public actionType ?: any;
    public actor ?: string;
    public actorId ?: string;
    public businessId ?: any;
    public businessType ?: any;
    public priority ?: any;
    public remark ?: string;

    constructor(
                id ?: any,
                actionDesc ?: string,
                actionLevel ?: any,
                actionTime ?: string,
                actionType ?: any,
                actor ?: string,
                actorId ?: string,
                businessId ?: any,
                businessType ?: any,
                priority ?: any,
                remark ?: string) {
        this.id = id ? id : null;
        this.actionDesc = actionDesc ? actionDesc : null;
        this.actionLevel = actionLevel ? actionLevel : null;
        this.actionTime = actionTime ? actionTime : null;
        this.actionType = actionType ? actionType : null;
        this.actor = actor ? actor : null;
        this.actorId = actorId ? actorId : null;
        this.businessId = businessId ? businessId : null;
        this.businessType = businessType ? businessType : null;
        this.priority = priority ? priority : null;
        this.remark = remark ? remark : null;
    }
}
