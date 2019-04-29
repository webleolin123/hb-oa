import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'containPipe'
})
export class ContainPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            if(value.endsWith('%')){//如果字符串以%字符 去掉%
                return value=value.slice(0,value.length-1);
            }
        }
    }
}
