import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(array: any, searchTerm: string): any {
        let results: any = [];
        if (!searchTerm) {
            return results = [];
        }
        array.filter((data: any) => {
            if (data.airport_name.toLowerCase().match(searchTerm.toLowerCase()) || data.city_name.toLowerCase().match(searchTerm.toLowerCase()) || data.IATA_code.toLowerCase().match(searchTerm.toLowerCase())) {
                results.push(data);
            }
        });
        return results;
    }

}
