import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'customPipe'
})
export class CustomPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if(value){
            if(args[0]==1){
                return value=value.split(',')[0];
            }
            else if(args[0]==2){
                return value=value.split(',')[1];
            }
            else{
                return value='是';
            }
        }
        else{
          if(args[0]){
            return value=0;
          }
          else{
            return value='否';
          }
        }
        // return args[0]+value
    }
}
