// 待复用添加新的model
export class ViewDataInfo {
    public all?: any;
    public not?: any;
    public already?: any;
    public adoptedApproveFee?: any;
    public adoptedNumber?: any;
    public cancelledNumber?: any;
    public processedNumber?: any;
    public toDoNumber?: any;
    public totalApplicantNumber?: any;
    public totalApproveFee?: any;
    public totalGoodNumber?: any;
    public totalNumber?: any;
    public usedApproveFee?: any;
    constructor(
        all?: any,
        not?: any,
        already?: any,
        adoptedApproveFee?: any,
        adoptedNumber?: any,
        cancelledNumber?: any,
        processedNumber?: any,
        toDoNumber?: any,
        totalApplicantNumber?: any,
        totalApproveFee?: any,
        totalGoodNumber?: any,
        totalNumber?: any,
        usedApproveFee?: any,
      )
      {
          this.all = all ? all : null;
          this.not = not ? not : null;
          this.already = already ? already : null;
          this.adoptedApproveFee = adoptedApproveFee ? adoptedApproveFee : null;
          this.adoptedNumber = adoptedNumber ? adoptedNumber : null;
          this.cancelledNumber = cancelledNumber ? cancelledNumber : null;
          this.processedNumber = processedNumber ? processedNumber : null;
          this.toDoNumber = toDoNumber ? toDoNumber : null;
          this.totalApplicantNumber = totalApplicantNumber ? totalApplicantNumber : null;
          this.totalApproveFee = totalApproveFee ? totalApproveFee : null;
          this.totalGoodNumber = totalGoodNumber ? totalGoodNumber : null;
          this.totalNumber = totalNumber ? totalNumber : null;
          this.usedApproveFee = usedApproveFee ? usedApproveFee : null;
    }
}
