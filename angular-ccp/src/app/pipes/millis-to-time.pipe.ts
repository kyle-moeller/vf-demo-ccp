import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "millisToTime"
})
export class MillisToTimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    //Utility functions
    let seconds = Math.floor((value / 1000) % 60);
    let minutes = Math.floor((value / (60 * 1000)) % 60);
    let hours = Math.floor((value / (60 * 60 * 1000)) % 60);

    return this.pad(hours, 2)  + ":" + this.pad(minutes, 2)  + ":" + this.pad(seconds, 2) ;
  }

  pad(val, size) {
    var s = String(val);
    while (s.length < (size || 2)) {
      s = "0" + s;
    }
    return s;
  }
}
