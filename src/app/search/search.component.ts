import { Component, OnInit } from '@angular/core';
import { HttpWorkService } from '../services/http-work.service';
import { BookModel } from '../shared/models';
import { Subscription } from '../../../node_modules/rxjs/Subscription';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles:[`
  tr td {
    font-size:12px;
  }
    `]
})
export class SearchComponent implements OnInit {
  private routeSubscription: Subscription;
    private querySubscription: Subscription;

  authorSearch
  titleSearch
  isbnSearch
  formatIdSearch
  minPageSearch
  maxPageSearch
  minPriceSearch;
  maxPriceSearch;
  formatsFromDb = []

  
  booksFromSearching:BookModel[] =[]
  constructor(private httpWorkService:HttpWorkService,private route: ActivatedRoute,private router:Router) { 

    this.querySubscription = route.queryParams.subscribe(
        (queryParam: any) => {
            this.authorSearch = queryParam['author'];
            this.titleSearch = queryParam['title'];
            this.isbnSearch = queryParam['isbn'];
            this.formatIdSearch = queryParam['formatId'];
            this.minPriceSearch = queryParam['price_gte'];
            this.maxPriceSearch = queryParam['price_lte'];
            this.minPageSearch = queryParam['pages_gte'];
            this.maxPageSearch = queryParam['pages_lte'];
           console.log(queryParam)
           if(this.authorSearch || this.titleSearch || this.isbnSearch || this.formatIdSearch || (this.minPriceSearch && this.maxPriceSearch) || (this.minPageSearch  && this.maxPageSearch)){
            this.searching()
           }
           
        }
    );
  }

  ngOnInit() {
    this.httpWorkService.getFormats().subscribe(res=>{
      console.log(res)
      for(let i in res){
        this.formatsFromDb.push(res[i])
    
      }
    })
  }
  
  searching(){
    let myParams = new BookModel();
    if(this.authorSearch){
      myParams.author = this.authorSearch;
    }
    if(this.titleSearch){
      myParams.title = this.titleSearch;
    }
    if(this.isbnSearch){
      myParams.isbn = this.isbnSearch;
    } 
    if(this.formatIdSearch){
      myParams.formatId = this.formatIdSearch;
    }    
    if(this.minPriceSearch){
      myParams.price_gte = this.minPriceSearch;
    }
    if(this.maxPriceSearch){
      myParams.price_lte= this.maxPriceSearch;
    }
    if(this.minPageSearch){
      myParams.pages_gte = this.minPageSearch;
    }
    if(this.maxPageSearch){
      myParams.pages_lte= this.maxPageSearch;
    }


    console.log(myParams)
    this.router.navigate(['/search'], { queryParams: myParams});

      console.log(myParams)

        this.httpWorkService.searchingByParams(myParams).subscribe(res=>{
          let arr1 = [];
          for(let i in res){
            arr1.push(res[i])
          }
          this.booksFromSearching = arr1
      console.log(res)
    })
  }
}
