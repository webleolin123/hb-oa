import { AfterViewInit, Component, OnDestroy,OnInit,ElementRef,Renderer2,ViewChild,Input} from '@angular/core';
//引入标签 弹窗 广播相关组件或库
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from "ng-jhipster";
import {Subscription} from "rxjs";
import {ViewDataInfo} from './chart.model';//chart组件Model
import {CommonMethodsService} from "@shared";//调用公共方法类
import { NzCustomAlertService } from '@shared';
// chart组件服务类
@Component({
  selector: 'custom-chart',
  templateUrl: './chart.component.html',
  styleUrls:['./chart.css']
})
export class ChartComponent implements OnInit,OnDestroy {
    @Input() parentData:any;
    // select选择 通过两个标志 对比 跟踪选择路径
    selectValue:any;//当前选择年/月/日 的 类型值
    oldSelectValue:any;// 上一个选择年/月/日 的类型值
    saveYearValue:any;// 当前选择年时的显示值
    saveMonthValue:any;// 当前选择月时的显示值
    result:ViewDataInfo;//接收请求回的数据
    day_start:any; //选择日--开始时间
    day_end:any;//选择日--结束时间
    options:any;//echart 配置对象
    arrIndex:any;//图表横轴的显示形态的 数组
    yearArr:any;//可选择年的情况 （暂时写死5年）
    monthArr:any;//可选月的情况
    interVal:any;//开始及结束时间的间隔
    itemName:any;//保存传来的item名称
    itemValue:any;//保存传来的item值
    itemValueTmp:any;//保存传来的item值
    itemValueTmpArr:any;//保存传来的item值

    searchYearResult:Subscription;//接收选择年结果的广播
    searchMonthResult:Subscription;//接收选择月结果的广播
    searchDayResult:Subscription;//接收选择日结果的广播
    echartsInstance:any;//echart实例
    constructor(
        public activeModal: NgbActiveModal,
        private commonMethodsService: CommonMethodsService,
        private eventManager: JhiEventManager,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}
    ngOnInit() {
        this.yearArr=[2018,2019,2020,2021,2022];//暂时先写5年内的选择
        this.day_start=this.commonMethodsService.getRangeDate( -5);//开始时间设置为与当天间隔5天前的日期
        this.day_end=this.commonMethodsService.getRangeDate( 0);//结束时间设置为当天
        this.saveYearValue= this.day_end.split('-')[0];//由结束时间获取当年
        this.saveMonthValue=this.day_end.split('-')[0]+'-'+this.day_end.split('-')[1];//由结束时间获取当月
        this.monthArr=['01','02','03','04','05','06','07','08','09','10','11','12'];// 月份基础值
        // 动态拼接格式化月份基础值
        this.monthArr.forEach((monthValue,i)=>{
            this.monthArr[i]=this.saveYearValue+'-'+this.monthArr[i];
        });
        if(this.parentData.onlyFlag){
           if(this.parentData.onlyDay){//只要含日 则默认选择日的显示情况
               this.selectValue=2;//选择日代表选择值为2
               this.oldSelectValue=2;//选择日代表选择值为2
           }
            if(this.parentData.onlyMonth&&!this.parentData.onlyDay){//初始化显示选择月
                this.selectValue=1;//选择月代表选择值为1
                this.oldSelectValue=1;//选择月代表选择值为1
            }
            if(this.parentData.onlyYear&&!this.parentData.onlyDay&&!this.parentData.onlyMonth){ //初始化显示选择年
                this.selectValue=0;//选择年代表选择值为0
                this.oldSelectValue=0;//选择年代表选择值为0
            }
        }
        else{
            //初始化显示选择日
            this.parentData.onlyDay=true;
            this.parentData.onlyMonth=true;
            this.parentData.onlyYear=true;
            this.selectValue=2;//选择日代表选择值为2
            this.oldSelectValue=2;//选择日代表选择值为2
        }
        this.load( this.selectValue );//加载初始化图表数据
        this.resizeChart();
    }
    onChartInit(ec){
        this.echartsInstance=ec;
    }
    resizeChart(){
        if(this.echartsInstance){
            this.echartsInstance.resize();
        }
    }
    // 选择开始时间触发函数
    selectDayStartChange(day_start){
        this.oldSelectValue=2;
        this.day_start=day_start;
        if(!this.day_start){
            this.nzCustomAlertService.info('请选择开始时间！');
            return
        }
        if( this.day_end<this.day_start){
          this.nzCustomAlertService.info('开始时间应小于结束时间！');
            return;
        }
        this.interVal=this.commonMethodsService.getInervalDay( this.day_start,this. day_end);
        if(this.interVal>30){
          this.nzCustomAlertService.info('筛选时间间隔不超过30天！');
            return;
        }
        this.load( this.selectValue );
    }
    // 选择结束时间触发函数
    selectDayEndChange(day_end){
        this.oldSelectValue=2;
        this.day_end=day_end;
        if(!this.day_end){
          this.nzCustomAlertService.info('请选择结束时间！');
            return
        }
        if( this.day_end<this.day_start){
          this.nzCustomAlertService.info('开始时间应小于结束时间！');
            return;
        }
        this.interVal=this.commonMethodsService.getInervalDay( this.day_start,this. day_end);

        if(this.interVal>30){
          this.nzCustomAlertService.info('请选择30天内容的日期！');
            return;
        }
        this.load( this.selectValue );
    }
    // 选择年下拉框触发函数
    selectYearChange(value){
        this.oldSelectValue=0;
        this.saveYearValue=value;
        // 选择年份的时候 把对应的月份基础值重新格式化
        this.monthArr.forEach((monthValue,i)=>{
            this.monthArr[i]=this.saveYearValue+'-'+this.monthArr[i].split('-')[1];
        });
        this.load( this.selectValue );
}
    // 选择月下拉框触发函数
    selectMonthChange(value){
        this.oldSelectValue=1;
        this.saveMonthValue=value;
        this.load( this.selectValue );
    }
    //选择日/月/年下拉框触发函数
    selectChange(value){
        // 当前选中 年 月 日 的值
        this.selectValue=value;
        // 当前日期
        const nowTime = new Date();
        //当年
        const year: number = nowTime.getFullYear();
        // 当月
        const nowMonth: any = ( nowTime.getMonth() + 1 ) < 10 ? '0' + ( nowTime.getMonth() + 1 ) : ( nowTime.getMonth() + 1 );
        //当天
        const nowDay: any = nowTime.getDate() < 10 ? '0' + nowTime.getDate() : nowTime.getDate();
        const nowDayCopy =nowTime.getDate();
        // 请求年
        if( this.selectValue==0){
            // 日--年
            if( this.oldSelectValue==2){
                this.saveYearValue= this.day_end.split('-')[0];
            }
            // 月--年
            else if( this.oldSelectValue==1||this.oldSelectValue==0){
                this.saveYearValue= this.saveMonthValue.split('-')[0];
            }
            else{
                this.saveYearValue= year;
            }
        }
        // 请求月
        else if( this.selectValue==1){
            // 日--月
            if(this.oldSelectValue==2){
                this.saveMonthValue= this.day_end.split('-')[0]+'-'+this.day_end.split('-')[1];
                // 选择月份的时候 把对应的月份基础值重新格式化
                this.monthArr.forEach((monthValue,i)=>{
                    this.monthArr[i]=this.saveMonthValue.split('-')[0]+'-'+this.monthArr[i].split('-')[1];
                });
            }
            // 年--月
            else if(this.oldSelectValue==0){
                this.saveMonthValue= this.saveYearValue+'-'+nowMonth;
            }
        }
        // 请求日
        else if( this.selectValue==2){
            //选择年--当日
            if(this.oldSelectValue==0){
                this.saveMonthValue= this.saveYearValue+'-'+nowMonth;
            }
            // 结束时间啊
            this.day_end=this.saveMonthValue+'-'+nowDay;
            // 开始时间计算 间隔往前五天
            const temp=nowDayCopy-5;
            if(temp>0){
                this.day_start=temp<10?this.saveMonthValue+'-0'+temp:this.saveMonthValue+'-'+temp;
            }
            // 如果当日是在五号以内 就显示 开始日期就定为每月一号
            else{
                this.day_start=this.saveMonthValue+'-'+'01';
            }
        }
        this.load( this.selectValue );
    }
    // 选择日/月/年 不同值时 广播当前选择值给调用组件发起请求作参数
    load(selectValue) {
        // 请求年
        if(selectValue==0){
            this.eventManager.broadcast({name: 'saveYearValue', content: this.saveYearValue});
            this.searchYearResult=this.eventManager.subscribe('saveYearValue_result', response => {
                if(response.name=='saveYearValue_result'){
                    this.onSuccess(response.content);
                }
                else{
                  this.nzCustomAlertService.error('哎呀！请求出错啦！')
                }
                this.searchYearResult.unsubscribe();
            } );
        }
        // 请求月
        else if(selectValue==1){
            this.eventManager.broadcast({name: 'saveMonthValue', content: this.saveMonthValue});
            this.searchMonthResult=this.eventManager.subscribe('saveMonthValue_result', response => {
                if(response.name=='saveMonthValue_result'){
                    this.onSuccess(response.content);
                }
                else{
                  this.nzCustomAlertService.info('哎呀！请求出错啦！');
                }
                this.searchMonthResult.unsubscribe();
            } );
        }
        // 请求日
        else if(selectValue==2){
            this.eventManager.broadcast({name: 'saveDayValue', content:{
                startTime:this.day_start,
                endTime:this.day_end,
             }});
            this.searchDayResult=this.eventManager.subscribe('saveDayValue_result', response => {
                if(response.name=='saveDayValue_result'){
                    this.onSuccess(response.content);
                }
                else{
                  this.nzCustomAlertService.info('哎呀！请求出错啦！');
                }
                this.searchDayResult.unsubscribe();
            } );
        }
    }
    ngOnDestroy(){
    }
    clear(){
        this.activeModal.dismiss('cancle');
    }
    private onSuccess(data,) {
        this.result = data;
        if(! this.result ){
          this.nzCustomAlertService.error('哎呀！请求出错啦！');
            return;
        }
        this.itemName=[];
        this.itemValue=[];
        //搞定item项名称显示  //搞定选择年，月，日时 横轴坐标对应显示
        for(const [key,value] of Object.entries(this.result)){
            this.arrIndex=[];
            if(value!==undefined&&value!==null){//有定义才循环
                if(this.selectValue==2) {
                    this.itemValueTmpArr=[];
                    this.itemValueTmp=value;//重复赋值；同一个key
                    for (const [k,v] of Object.entries(this.itemValueTmp)) {
                        this.arrIndex.push(k);
                        this.itemValueTmpArr.push(v);
                    }
                    this.itemValue.push(this.itemValueTmpArr);//接收去重后的新数组
                }
                else{
                    if(this.selectValue==0){//选择年  横轴显示自定义显示key--月份
                        this.arrIndex=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',];
                    }
                    else{//选择月  横轴显示自定义显示key--周
                        this.arrIndex=['第1周','第2周','第3周','第4周','第5周'];
                    }
                    this.itemValue.push(value);
                }
                this.itemName.push(key);
            }
        }
        this.options = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: [...this.itemName]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            // 横轴
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    interval:0,
                    data: this.arrIndex,//注意如果item给了 没有赋值  横轴会不显示 但是echart没报错
                }
            ],
            // 纵轴
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: this.itemName[0],
                    type: 'line',
                    data: this.itemValue[0],
                    itemStyle:{
                        normal:{
                            color:'#40dc7e',
                            lineStyle:{
                                color:'#40dc7e'
                            }
                        }
                    }
                },
                {
                    name: this.itemName[1],
                    type: 'line',
                    data: this.itemValue[1],
                    itemStyle:{
                        normal:{
                            color:'#ff4c6a',
                            lineStyle:{
                                color:'#ff4c6a'
                            }
                        }
                    }
                },
                {
                    name: this.itemName[2],
                    type: 'line',
                    data: this.itemValue[2],
                    itemStyle:{
                        normal:{
                            color:'#8a7fff',
                            lineStyle:{
                                color:'#8a7fff'
                            }
                        }
                    }
                },
                {
                    name: this.itemName[3],
                    type: 'line',
                    data: this.itemValue[3],
                    itemStyle:{
                        normal:{
                            color:'#4ca6ff',
                            lineStyle:{
                                color:'#4ca6ff'
                            }
                        }
                    }
                },
                {
                    name: this.itemName[4],
                    type: 'line',
                    data: this.itemValue[4],
                    itemStyle:{
                        normal:{
                            color:'#ffa100',
                            lineStyle:{
                                color:'#ffa100'
                            }
                        }
                    }
                },
                {
                    name: this.itemName[5],
                    type: 'line',
                    data: this.itemValue[5],
                    itemStyle:{
                        normal:{
                            color:'#00e7c0',
                            lineStyle:{
                                color:'#00e7c0'
                            }
                        }
                    }
                },
                {
                    name: this.itemName[6],
                    type: 'line',
                    data: this.itemValue[6],
                    itemStyle:{
                        normal:{
                            color:'#0065c0',
                            lineStyle:{
                                color:'#0065c0'
                            }
                        }
                    }
                },
                {
                    name: this.itemName[7],
                    type: 'line',
                    data: this.itemValue[7],
                    itemStyle:{
                        normal:{
                            color:'#d97eff',
                            lineStyle:{
                                color:'#d97eff'
                            }
                        }
                    }
                },
                {
                    name: this.itemName[8],
                    type: 'line',
                    data: this.itemValue[8],
                    itemStyle:{
                        normal:{
                            color:'#00cefb',
                            lineStyle:{
                                color:'#00cefb'
                            }
                        }
                    }
                },
                {
                    name: this.itemName[9],
                    type: 'line',
                    data: this.itemValue[9],
                    itemStyle:{
                        normal:{
                            color:'#ffa4b3',
                            lineStyle:{
                                color:'#ffa4b3'
                            }
                        }
                    }
                },
                {
                    name: this.itemName[10],
                    type: 'line',
                    data: this.itemValue[10],
                    itemStyle:{
                        normal:{
                            color:'#1abf32',
                            lineStyle:{
                                color:'#1abf32'
                            }
                        }
                    }
                },
                {
                    name: this.itemName[11],
                    type: 'line',
                    data: this.itemValue[11],
                    itemStyle:{
                        normal:{
                            color:'#ffdd3d',
                            lineStyle:{
                                color:'#ffdd3d'
                            }
                        }
                    }
                },
            ]
        };
    }
    private onError(err) {
      this.nzCustomAlertService.error('哎呀！请求出错啦！')
    }
}
