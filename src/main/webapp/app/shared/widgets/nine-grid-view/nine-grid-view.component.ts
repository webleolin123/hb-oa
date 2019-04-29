import {Component,OnInit,OnDestroy} from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
import {JhiEventManager} from "ng-jhipster";
import {Subscription} from "rxjs";

@Component({
    selector: 'widgts-nine-grid-view',
    styleUrls: ['./nine-grid-view.component.less'],
    templateUrl:'./nine-grid-view.component.html',
})
export class WidgetNineGridViewComponent implements  OnInit,OnDestroy{
    subInfo:Subscription;
    imgList:any=[];
    previewImage = '';
    previewVisible = false;
    handlePreview = (file: UploadFile) => {
        this.previewImage = file.url;
        this.previewVisible = true;
    };
    constructor(
        private eventManager: JhiEventManager,
    ) {}
    ngOnInit(){
        this.registerChangeInUsers();
    }
    registerChangeInUsers() {
        this.subInfo=this.eventManager.subscribe('widgets-nine-grid-view', (response) => {
            if(response.name=='widgets-nine-grid-view'){
                this.imgList=response.content;
            }
        });
    }
    ngOnDestroy(){
        this.subInfo.unsubscribe();
    }


}

