import { Component, OnInit } from '@angular/core';
import { HttpWorkService } from '../services/http-work.service';
import { BookModel } from '../shared/models';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  authorSearch
  titleSearch
  isbnSearch
  formatIdSearch
  minPageSearch
  maxPageSearch
  minPriceSearch;
  maxPriceSearch;
  formatsFromDb = []
  constructor(private httpWorkService:HttpWorkService) { }

  ngOnInit() {

    this.httpWorkService.getFormats().subscribe(res=>{
      console.log(res)
      for(let i in res){
        this.formatsFromDb.push(res[i])
    
      }
    })
  }
  searching(){
    console.log(this.authorSearch,this.formatIdSearch)
  }
}
