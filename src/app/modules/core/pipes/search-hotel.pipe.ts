import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchHotel'
})
export class SearchHotelPipe implements PipeTransform {

    transform(array: any, searchTerm: string): any {
        let results: any = [];
        if (!searchTerm) {
            return results = array;
        }
        array.filter((data: any) => {
            if (data.name.toLowerCase().match(searchTerm.toLowerCase())) {
                results.push(data);
            }
        });
        return results;
    }

}
