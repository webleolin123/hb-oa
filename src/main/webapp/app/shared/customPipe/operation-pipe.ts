import { Pipe, PipeTransform } from '@angular/core';
import { CommonMethodsService } from '../methods/commonMethods.service';
@Pipe({
    name: 'operationPipe'
})
export class OperationPipe implements PipeTransform {
    constructor(
        private commonMethodsService: CommonMethodsService,
    ) {
    }
    transform(value: any, ...args: any[]): any {
        if (args[0]) {
            return value = this.commonMethodsService.accDiv((value - args[0]), args[0]);
        }
    }
}
