import { Pipe, PipeTransform } from '@angular/core';
import { StaffInterface } from '../utils/interface';

@Pipe({
  name: 'pipeSearchFilter'
})
export class PipeSearchFilterPipe implements PipeTransform {

  listnull: StaffInterface[] = []
  transform(listdata: StaffInterface[], searchValue: string, searchType: string){

    if (!listdata || !searchValue) {
      return listdata
    }
    console.log(searchType + "-" + searchValue);

    if (searchType == "searchID") {
      return listdata.filter(data => data.userId.toString().includes(searchValue.toLocaleLowerCase()))
    } else if (searchType == "SearchPhone") {
      return listdata.filter(data => data.phoneNumber.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    } else if (searchType == "SearchName") {
      return listdata.filter(data => data.fullname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    }
    return this.listnull
  }

}

