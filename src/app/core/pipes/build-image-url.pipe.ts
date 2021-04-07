import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'buildImageUrl'
})
export class BuildImageUrlPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? environment.storage + args[0] + '%2F' + value + '?alt=media' : '';
  }

}
