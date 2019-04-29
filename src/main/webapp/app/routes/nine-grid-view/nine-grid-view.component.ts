import {Component, OnInit, OnDestroy, Input} from '@angular/core';

@Component({
    selector: 'nine-grid-view',
    styleUrls: ['./nine-grid-view.component.less'],
    templateUrl:'./nine-grid-view.component.html',
})
export class NineGridViewComponent{
    imgList:any;
    constructor() {
        // this.imgList=['../../../assets/tmp/img/avatar.jpg','../../../assets/tmp/img/avatar.jpg','../../../assets/tmp/img/avatar.jpg','../../../assets/tmp/img/avatar.jpg','../../../assets/tmp/img/avatar.jpg','../../../assets/tmp/img/avatar.jpg','../../../assets/tmp/img/avatar.jpg','../../../assets/tmp/img/avatar.jpg','../../../assets/tmp/img/avatar.jpg'];
        this.imgList=[
            {
                uid: 1,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 2,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 3,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 4,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 5,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 6,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 7,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 8,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 9,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 10,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 11,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
        ];
    }
    previewImage = '';
    previewVisible = false;

    handlePreview = () => {
        this.previewImage = this.imgList[0].url;
        this.previewVisible = true;
    }
    handleRemove=()=>{
        return ;
    }

}

