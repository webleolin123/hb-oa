import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'cutStrPipe'
})
export class CutStrPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            const cutLength=5;
            if(value.length<cutLength){
                return value;
            }
            else{
                let result='';
                for(let i=0,len=value.length;i<len;i++){
                    result+=value[i];
                    if((i+1)%cutLength==0){
                        result+='\r\n';
                    }
                }
                return result ;
            }
        }
    }
}
