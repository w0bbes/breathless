import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})

export class OrderByPipe implements PipeTransform {
    transform(value: any, args: any[]): any {

        let returnValue = 0;

        if (value instanceof Array && value.length > 0) {

            if (args[0].length > 0) {

                let sortType = args[0];

                // if the sort direction is true
                if (args[1]) {
                    value.sort((a: any, b: any) => {
                        returnValue = a[sortType].toLowerCase() < b[sortType].toLowerCase() ? 1 : -1;
                        return returnValue;
                    } );

                // if the sort direction is false
                } else {
                    value.sort((a: any, b: any) => {
                        returnValue = a[sortType].toLowerCase() > b[sortType].toLowerCase() ? 1 : -1;
                        return returnValue;
                    } );
                }

            }
        }

        return value;
    }
}
