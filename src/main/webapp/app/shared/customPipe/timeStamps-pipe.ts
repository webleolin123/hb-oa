import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'timeStamp'
})
export class TimeStampsPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
                const date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                const Y = date.getFullYear() + '-';
                const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                // D = date.getDate() + ' ';
                const h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
                const m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
                const s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                // return M + D + h + m;
                const curTime = new Date();
                if (date.getDate() == curTime.getDate()) {
                    return M + D + h + m;
                } else {
                    return Y + M + D;
            }
        }
    }
}
