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
  auth;
  title;
  
  booksFromSearching:BookModel[] =[]
  constructor(private httpWorkService:HttpWorkService,private route: ActivatedRoute,private router:Router) { 

    this.querySubscription = route.queryParams.subscribe(
        (queryParam: any) => {
            this.authorSearch = queryParam['author'];
            this.titleSearch = queryParam['title'];
            this.isbnSearch = queryParam['isbn'];
            this.formatIdSearch = queryParam['formatId'];
           console.log(queryParam)
           if(this.authorSearch || this.titleSearch || this.isbnSearch || this.formatIdSearch){
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
  arrPrice
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
    if(this.formatIdSearch){
      myParams.formatId = this.formatIdSearch;
    }  
    if(this.minPriceSearch){
      myParams._priceStart = this.minPriceSearch;
    }
    if(this.maxPriceSearch){
      myParams._priceEnd= this.maxPriceSearch;
    }
    if(this.minPageSearch){
      myParams._pageStart = this.minPageSearch;
    }
    if(this.maxPageSearch){
      myParams._pageEnd= this.maxPageSearch;
    }
    let arrayBook = []
    if(myParams._priceStart && myParams._priceEnd ){
      this.booksFromSearching = []
      this.httpWorkService.getBooks().subscribe(res=>{

        let arr = [];
        for(let i in res){
          arr.push(res[i])
        }
        arrayBook = arr;
        this.booksFromSearching = arr.filter(e=>{
          console.log(e)
          return  (e.price < myParams._priceEnd) && (e.price > myParams._priceStart)
        })
        console.log(this.booksFromSearching)
      })



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
