import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { HttpWorkService } from '../services/http-work.service';
import { BookModel } from '../shared/models';
import { NgForm} from '@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit,OnDestroy {
  curAuthor ="";
  curTitle ="";
  curIsbn="";
  curPages;
  curDescription;
  curPrice;
  curCountryId
  curCityId
  curCompanyId;

  companiesFromDb = []
  citiesFromDb = []
  countriesFromDb = []
  formatsFromDb = []
  isNewBook;
  lastID;

  newBook;
  constructor(private httpWorkService:HttpWorkService, private router:Router) { 
    this.isNewBook = this.httpWorkService.setNewBookMode()
  }
  currentBook:BookModel;
  cBook
  ngOnInit() {
    this.httpWorkService.getBooks().subscribe(res=>{
      let arr = []
      for(let i in res){
        arr.push(res[i])
      }
      this.lastID = arr.length+1
      console.log(this.lastID)
      
    })
    this.httpWorkService.getCountries().subscribe(res=>{
      console.log(res)
      for(let i in res){
        this.countriesFromDb.push(res[i])
    
      }
    })

    this.httpWorkService.getCities().subscribe(res=>{
      console.log(res)
      for(let i in res){
        this.citiesFromDb.push(res[i])
    
      }
    })

    this.httpWorkService.getCompanies().subscribe(res=>{
      console.log(res)
      for(let i in res){
        this.companiesFromDb.push(res[i])
    
      }
    })

    this.httpWorkService.getFormats().subscribe(res=>{
      console.log(res)
      for(let i in res){
        this.formatsFromDb.push(res[i])
    
      }
    })
      
    this.currentBook = this.httpWorkService.getCurrentBook();

    console.log(this.currentBook)
    if(!this.currentBook){
      this.isNewBook = this.httpWorkService.setNewBookMode();
      this.newBook = new BookModel();
     
    } else {
      this.cBook = new BookModel()
      this.cBook.id = this.currentBook.id;
      this.cBook.author = this.currentBook.author;
      this.cBook.title = this.currentBook.title;
      this.cBook.isbn = this.currentBook.isbn;
      this.cBook.pages = this.currentBook.pages;
      this.cBook.description = this.currentBook.description;
      this.cBook.formatId = this.currentBook.formatId;
      this.cBook.price = this.currentBook.price;
      this.cBook.countryId = this.currentBook.countryId;
      this.cBook.cityId = this.currentBook.cityId;
      this.cBook.companyId= this.currentBook.companyId;
      console.log(this.cBook)

      this.isNewBook = this.httpWorkService.setReadBookMode()
    }
    
  }

  ngOnDestroy(): void {
    this.isNewBook = this.httpWorkService.setNewBookMode()
    this.httpWorkService.nullBook()  
  }

  editedBook(){
    this.httpWorkService.putEditBook(this.cBook).subscribe(res=>{
      console.log(res)
      setTimeout(()=>{
        this.router.navigate(
          ['/showcase']
        );
      },2000)

    })
  }


  createNewBook(){
        this.httpWorkService.postBook(this.newBook).subscribe(res=>{
      console.log(res)

      setTimeout(()=>{
        this.router.navigate(
          ['/showcase']
        );
      },2000)
    },err=>{
      console.log(err)
    })
  }
}
