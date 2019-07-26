import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "quickConnectFilter"
})
export class QuickConnectFilterPipe implements PipeTransform {
  transform(endpoints: any[], searchText: string): any[] {
    if (!endpoints) return [];
    if (!searchText) return endpoints;

    searchText = searchText.toLowerCase();

    return endpoints.filter(endpoint => {
      return endpoint.name.toLowerCase().includes(searchText);
    });
  }
}
