import {Component, OnInit, OnDestroy, Input} from '@angular/core';

declare var AMap: any; // 一定要声明AMap，要不然报错找不到AMap
declare var AMapUI: any; // 一定要声明AMapUI，要不然报错找不到AMapUI
declare var $: any;
@Component({
    selector: 'ngx-lbs-amap',
    styleUrls: ['../../../../styles/lbs-amap.css',],
    template: `
        <page-header [title]="'高德地图'"
                     [breadcrumb]="breadcrumb">
            <ng-template #breadcrumb>
                <nz-breadcrumb>
                    <nz-breadcrumb-item><a routerLink="/">home</a></nz-breadcrumb-item>
                    <nz-breadcrumb-item><a href="javascript:;">主导航</a></nz-breadcrumb-item>
                    <nz-breadcrumb-item><a href="javascript:;">高德地图</a></nz-breadcrumb-item>
                </nz-breadcrumb>
            </ng-template>
        </page-header>
        <div id="outer-box">
            <div id="container" tabindex="0" style="margin-bottom: 20px;"></div>
            <div id="panel" class="scrollbar1">
                <ul id="myList">
                </ul>
            </div>
        </div>
    `,
})
export class LbsAmapComponent implements OnInit, OnDestroy {
    @Input() dataArr: any;
    map: any;//创建的实例图
    markerList: any;//标注列表
    data = [];//返回数据 对象数组
    template: any;//AMapUI中要渲染的模板
    cityCode='';//城市码
    cityCenter=[];//城市中心经纬度

    constructor(
    ) {
    }
    ngOnInit() {
        this.dataArr=[];
        for(let i=1;i<=100;i++){//模拟数据
            let p='';
            let city='';
            if(i<=20){
                p='119.296389,26.'+(200*i);city='福州';this.makeData(p,i,city);
            }
            else if(i>20&&i<=40){
                p='118.110221,24.'+(200*i);city='厦门';this.makeData(p,i,city);
            }
            else if(i>40&&i<=60){
                p='118.675847,24.'+(200*i);city='泉州';this.makeData(p,i,city);
            }
            else if(i>40&&i<=80){
                p='119.307556,26.'+(200*i);city='漳州';this.makeData(p,i,city);
            }
            else{
                p='120.209947,30.'+(200*i);city='杭州';this.makeData(p,i,city);
            }
        }
        setTimeout(()=>{
            this.data = this.dataArr;
            this.loadData(this.data);
        },500);
    }
    makeData(p,i,city){
        this.dataArr.push({
            id: i,
            position: p,
            label: 'label_'+i,
            pic:i%2==0?'':'../../../../assets/tmp/img/1.png',
            city:city,
            tel:i%2==1?'':'123456',
            address:'阿帆拉拉肥阿发了阿发了了阿发了了阿发',
        });
    }

    ngOnDestroy() {
    }

    loadData(data) {
        if (data) {
            this.data = data;
            this.data.forEach((item, i) => {
                this.data[i].position = (item.position + '').split(',')
            });
            this.getMap();
        }
    }
    getMap(){
        //判断AMap并引入
        if (typeof(AMap) == "undefined") {
            $.getScript("https://webapi.amap.com/maps?v=1.4.12" +
                "&key=0865ac92769573a25a285f6354a5c28b" +
                "&plugin=AMap.Geolocation,AMap.MapType,AMap.Scale,AMap.OverView,AMap.ToolBar,AMap.Autocomplete,AMap.PlaceSearch").done((script, textstatus)=>{
                if (textstatus == "success" && typeof (AMap) != undefined) {
                    this.useAMap();
                } else {
                    alert("网络超时，请重试");
                }
            });
        }else {
            this.useAMap();
        }
    }
    useAMap() { //所有使用AMap的内容
        //创建地图
        this.map = new AMap.Map('container', {
            // resizeEnable: true,
            zoom: 4,
            // center: this.cityCenter,
        });
        //添加工具条等地图控件
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView', 'AMap.MapType', 'AMap.Geolocation'],
            () => {
                // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                this.map.addControl(new AMap.ToolBar({
                    offset:new AMap.Pixel(25,75),
                }));
                // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                this.map.addControl(new AMap.Scale({
                    offset:new AMap.Pixel(10,20),
                    position:'LT',
                }));
                // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
                // this.map.addControl(new AMap.OverView({isOpen: true}));
                // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
                // this.map.addControl(new AMap.MapType());
                // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
                // this.map.addControl(new AMap.Geolocation({buttonOffset: new AMap.Pixel(10, 80)}));
                let geolocation=new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                    convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,        //显示定位按钮，默认：true
                    buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(33, 425),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,        //定位成功后用圆圈表示定位精
                    // 度范围，默认：true
                    panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                });
                this.map.addControl(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', this.onComplete(geolocation));//返回定位信息
                AMap.event.addListener(geolocation, 'error', this.onError(geolocation));      //返回定位出错信息
                // map.removeControl(toolBar);//删除控件
            });
        //判断AMapUI并引入
        if (typeof(AMapUI) == "undefined") {
            $.getScript("https://webapi.amap.com/ui/1.0/main.js?v=1.0.11").done((script, textstatus)=>{
                if (textstatus == "success" && typeof (AMap) != undefined) {
                    this.useAMapUI();
                }
                else {
                    alert("网络超时，请重试");
                }
            });
        }
        else {
            //所有使用AMapUI的内容
            this.useAMapUI();
        }
        // this.useAMapUI();
    }
    onComplete(geolocation){
        geolocation.getCityInfo((status,result)=>{
            console.log('status',status);
            if(status=='complete'){
                console.log('geolocation_result',result);
                this.cityCode=result.citycode;
                this.cityCenter=result.center;
            }
            if(status=='error'){
                alert('查询失败');
            }
        })
    }
    onError(geolocation){
        console.log('geolocation_error',geolocation);
    }
    useAMapUI() {  //所有使用AMapUI的内容
        AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
            (MarkerList, SimpleMarker, SimpleInfoWindow) => {
                let defaultIconStyle = 'red', //默认的图标样式
                    hoverIconStyle = 'green', //鼠标hover时的样式
                    selectedIconStyle = 'purple' //选中时的图标样式
                this.markerList = new MarkerList({
                    //关联的map对象
                    map: this.map,
                    //列表的dom容器的id
                    listContainer: 'myList',
                    //需要监听的列表节点事件
                    listElementEvents: ['click', 'mouseenter', 'mouseleave'],
                    //需要监听的marker事件
                    markerEvents: ['click', 'mouseover', 'mouseout'],
                    //需要监听的infoWindow事件
                    infoWindowEvents: ['click', 'mouseover', 'mouseout'],
                    selectedClassNames: 'selected',
                    autoSetFitView: true,
                    //返回数据项的Id
                    getDataId(item, index) {
                        //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
                        return item.id;
                    },
                    //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
                    getPosition(item) {
                        return item.position;
                    },
                    getInfoWindow(data, context, recycledInfoWindow) {
                        if (recycledInfoWindow) {
                            //存在可回收利用的infoWindow, 直接更新内容返回
                            recycledInfoWindow.setInfoTitle(data.id);
                            recycledInfoWindow.setInfoBody(data.address);
                            return recycledInfoWindow;
                        }
                        //返回一个新的InfoWindow
                        return new SimpleInfoWindow({
                            offset: new AMap.Pixel(0, -32),
                            infoTitle: data.id,
                            infoBody: data.address
                        });
                    },
                    //返回数据项对应的Marker
                    //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
                    getMarker(data, context, recycledMarker) {
                        const label =data.id;
                        //存在可回收利用的marker
                        if (recycledMarker) {
                            //直接更新内容返回
                            recycledMarker.setIconLabel(label);
                            return ;
                        }
                        return new SimpleMarker({
                            containerClassNames: 'my-marker',
                            iconStyle: defaultIconStyle,
                            iconLabel: label
                        });
                    },
                    getListElement(data, context, recycledListElement) {
                        const label = data.id + context.index;
                        let tpl='';
                    if((data.id-1)%20==0){
                        tpl+='<h2 style="text-align: center;border-bottom: 1px solid gray;padding-bottom: 4px;margin-bottom: 0">' + '<%- data.city %>' + '</h2>'+'<div class="clear"></div>';
                    }
                    tpl+='<% if(data.pic.length>0) { %>' +
                        '<div class="poi-imgbox" style="padding-right:5px;float:right">' +
                        '    <span class="poi-img" style="background:url(<%- data.pic %>) no-repeat;display:inline-block;width:100px;height:62px;"></span>' +
                        '</div>' +
                        '<% } %>' +
                        '<div class="poi-info-left" style="padding-left:10px;">' +
                        '    <h3 class="poi-title" style="margin-bottom:1px;">' +
                        '        <%- data.id %>. <%- data.label %>' +
                        '    </h3>' +
                        '    <div class="poi-info">' +
                        '        <p class="poi-addr" style="margin-bottom: 1px">地址：<%- data.address %></p>' +
                        '<% if(data.tel.length>0){ %>' +
                        '        <p class="poi-addr" style="margin-bottom: 1px">电话：<%- data.tel %></p>' +
                        '<% } %>' +
                        '    </div>' +
                        '</div>' +
                        '<div class="clear"></div>';
                        //使用模板创建
                        let innerHTML = MarkerList.utils.template(tpl, {
                            data: data,
                            label: label,
                        });

                        if (recycledListElement) {
                            recycledListElement.innerHTML = innerHTML;
                            return recycledListElement;
                    }

                        return '<li class="poibox" style="border-bottom: 1px solid #dadada;">' + innerHTML + '</li>';
                    },
                });
                this.markerList.on('listElementMouseenter markerMouseover',
                    (event, record) => {
                        if (record && record.marker) {
                            //非选中的id
                            if (!this.markerList.isSelectedDataId(record.id)) {
                                //设置为hover样式
                                record.marker.setIconStyle(hoverIconStyle);
                                //this.closeInfoWindow();
                            }
                        }
                    });
                this.markerList.on('listElementMouseleave markerMouseout', (event, record)=> {

                    if (record && record.marker) {

                        if (!this.markerList.isSelectedDataId(record.id)) {
                            //恢复默认样式
                            record.marker.setIconStyle(defaultIconStyle);
                        }
                    }
                });
                //监听选中改变
                this.markerList.on('selectedChanged', (event, info) => {
                    if (info.selected) {
                        if (info.selected.marker) {
                            //更新为选中样式
                            info.selected.marker.setIconStyle(selectedIconStyle);
                        }
                        //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
                        if (!info.sourceEventInfo.isListElementEvent) {

                            if (info.selected.listElement) {
                                this.scrollListElementIntoView($(info.selected.listElement));
                            }
                        }
                    }
                    if (info.unSelected && info.unSelected.marker) {
                        //更新为默认样式
                        info.unSelected.marker.setIconStyle(defaultIconStyle);
                    }
                });
                //展示该数据
                this.markerList.render(this.data);
            });
    }
    scrollListElementIntoView($listEle) {
        // const  $tar=$listEle;
        if (!this.isElementInViewport($listEle.get(0))) {
            $('#panel').scrollTop($listEle.offset().top - $listEle.parent().offset().top);
        }
        //闪动一下
        $listEle
            .one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                (e)=> {
                    const  $tar=$(e.target);
                    console.log('e',e);
                    console.log('$tar',$tar);
                    $tar.removeClass('flash animated');
                }).addClass('flash animated');
    }
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }
}

