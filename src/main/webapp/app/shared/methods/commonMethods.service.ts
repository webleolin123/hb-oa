import {Injectable} from '@angular/core';
@Injectable()
export class CommonMethodsService {
    constructor() {
    }
    //判断正整数正则
    valiPositiveInteger(str){
        const r = /^\+?[1-9][0-9]*$/;　　//正整数
        return r.test(str);
    }
    //判断非负数正则
    valiNotNegativeInteger(str){
        const r = /^\d+(\.{0,1}\d+){0,1}$/;　　//非负数
        return r.test(str);
    }
    /**
     * 获取上一个月
     *
     * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
     */
    myTrim(type:string,str:string){
        if(type=='all'){// 去除str所有的空格
            return str.replace(/\s*/g,'');
        }
        else if(type=='besides'){// 去除str两头的空格
            return str.replace(/^\s*|\s*$/g,'');
        }
        else if(type=='besides_many'){// 去除str两头的空格
            return str.replace(/^\s+|\s+$/gm,'');
        }
        else if(type=='left'){// 去除左空格
            return str.replace(/^\s*/,'');
        }
        else if(type=='right'){// 去除右空格
            return str.replace(/(\s*$)/g,'');
        }
        else{// 去除str前后多个空格
            return str;
        }


    }
    getPreDate(date,returnType:any) {
        const arr = date.split('-');
        const year = arr[0]; //获取当前日期的年份
        const month = arr[1]; //获取当前日期的月份
        const day = arr[2]; //获取当前日期的日
        const days = new Date(year, month, 0).getDate(); //获取当前日期中月的天数;
        let year2 = year;
        let month2:any= Number(month) - 1;
        if (month2 == 0) {//如果是1月份，则取上一年的12月份
            year2 = Number(year2) - 1;
            month2 = 12;
        }
        let day2 = day;
        const days2 = new Date(year2, month2, 0).getDate();
        if (day2 > days2) {//如果原来日期大于上一月的日期，则取当月的最大日期。比如3月的30日，在2月中没有30
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;//月份填补成2位。
        }
        // const returnTime = year2 + '-' + month2 + '-' + day2;
        if(returnType){
            if(returnType=='year'){
                return year2;
            }
            if(returnType=='month'){
                return month2;
            }
            if(returnType=='year-month'){
                return year2 + '-' + month2;
            }
            if(returnType=='day'){
                return day2;
            }
        }
        else{
            return year2 + '-' + month2 + '-' + day2;
        }
    }
    // 自定义数据过滤函数
    myFilter(type, value) {
        if (type == 'statisticsDate') {//如果类型为‘统计日期’
            if (value) {
                value = value.split(',');
                if(value[1]){
                    value=value[0]+' '+'第'+value[1]+'周';
                }
            }
            return value;
        }
        if (type == 'image') {//如果类型为‘问题类型--图片’
            let html = '';
            if (value) {
                value = value.split(',');
                value.forEach((img, i) => {
                    html += `图片${i + 1}请求地址:${img}`;
                })
            }
            return html;
        }
        if (type == 'problemType') {//如果类型为‘问题类型’
            switch (value) {
                case 1:
                    value = '差价问题';
                    break;
                case 2:
                    value = '商品错漏发';
                    break;
                case 3:
                    value = '商品破损';
                    break;
                case 4:
                    value = '商品指导使用';
                    break;
                case 5:
                    value = '其他问题';
                    break;
                default:
                    value = '未知参数';
                    break;
            }
        }
        if (type == 'helpType') {
            switch (value) {//如果类型为‘帮助类型’或‘处理方式’
                case 1:
                    value = '商品补发';
                    break;
                case 2:
                    value = '退差价';
                    break;
                case 3:
                    value = '直接退货';
                    break;
                case 4:
                    value = '客服协助';
                    break;
                default:
                    value = '未知参数';
                    break;
            }
        }
        if (type == 'actionType') {
            switch (value) {//如果类型为‘帮助类型’或‘处理方式’
                case 0:
                    value = '';
                    break;
                case 1:
                    value = '商品补发';
                    break;
                case 2:
                    value = '退差价';
                    break;
                case 3:
                    value = '直接退货';
                    break;
                case 4:
                    value = '客服协助';
                    break;
                default:
                    value = '未知参数';
                    break;
            }
        }
        if (type == 'createdDate') {//如果类型为‘创建时间’
            value = value.split('T')[0];
        }
        if (type == 'status') {
            switch (value) {//如果类型为‘状态’
                case 1:
                    value = '未处理';
                    break;
                case 2:
                    value = '已处理';
                    break;
                default:
                    value = '未知参数';
                    break;
            }
        }
        if (type == 'active') {
            if (value) {
                value = '是';
            } else {
                value = '否';
            }
        }
        return value;
    }
    exportCsv(obj, csvName) {
        const title = obj.title;
        //titleForKey ["","",""]
        const titleForKey = obj.titleForKey;
        const data = obj.data;
        const str = [];
        str.push(obj.title.join(",") + "\n");
        for (let i = 0; i < data.length; i++) {
            const temp = [];
            for (let j = 0; j < titleForKey.length; j++) {
                temp.push(data[i][titleForKey[j]]);
            }
            str.push(temp.join(",") + "\n");
        }
        const compatible = "\uFEFF";
        const blob = new Blob([compatible + str.join("")], {type: 'text/csv;charset=utf-8;'});
        // const uri = 'data:text/csv;charset=gb2312;' + encodeURIComponent(str.join(""));
        const uri = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = uri;
        downloadLink.download = csvName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    /**
     * @param {number} range
     * @param {string} [type]
     * @memberOf VehicleOverviewComponent
     * @description 获取指定range的日期
     */
    getRangeDate(range: number) {
        const formatDate = (time: any) => {
            // 格式化日期，获取今天的日期
            const Dates = new Date(time);
            const year: number = Dates.getFullYear();
            const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
            const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
            return year + '-' + month + '-' + day;
        };
        // const resultArr: Array<any> = [];
        let changeDate: string;
        changeDate = formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
        return changeDate;
    }
    //自定义时间差函数（转毫秒比较）
    getInervalDay(startDate: string, endDate: string) {
        const ms = new Date(endDate).getTime() - new Date(startDate).getTime();
        if (ms < 0) return 0;
        return Math.floor(ms / 1000 / 60 / 60 / 24);
    }
    //加法函数
    accAdd(arg1, arg2) {
        let r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2));
        return (arg1*m+arg2*m)/m;
    }
//减法函数
    Subtr(arg1, arg2) {
        let r1,r2,m,n;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2));
        //动态控制精度长度
        n=(r1>=r2)?r1:r2;
        return ((arg1*m-arg2*m)/m).toFixed(n);
    }
//乘法函数
    accMul(arg1,arg2) {
        let m=0;
        const s1=arg1.toString();
        const s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
    }
//除法函数
    accDiv(arg1,arg2) {
        let t1=0,t2=0,r1,r2;
        try{t1=arg1.toString().split(".")[1].length}catch(e){}
        try{t2=arg2.toString().split(".")[1].length}catch(e){}
        r1=Number(arg1.toString().replace(".",""));
        r2=Number(arg2.toString().replace(".",""));
        return (r1/r2)*Math.pow(10,t2-t1);
    }
}
