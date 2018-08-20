import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { HttpWorkService } from '../services/http-work.service';
import { BookModel } from '../shared/models';
import { NgForm} from '@angular/forms';
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
  isNewBook;
  newAuthor="";
  newTitle ="";
  newIsbn;
  newPages;
  newDescription;
  newPrice;
  newCityId;
  newCompanyId;
  newCountryId
  lastID
  constructor(private httpWorkService:HttpWorkService) { 
    this.isNewBook = this.httpWorkService.setNewBookMode()
  }
  currentBook:BookModel;

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
    this.currentBook = this.httpWorkService.getCurrentBook();

    console.log(this.currentBook)
    if(!this.currentBook){
      this.isNewBook = this.httpWorkService.setNewBookMode()
    } else {
      this.curAuthor = this.currentBook.author;
      this.curTitle = this.currentBook.title;
      this.curIsbn = this.currentBook.isbn;
      this.curPages = this.currentBook.pages;
      this.curDescription = this.currentBook.description;
      this.curPrice = this.currentBook.price;
      this.curCountryId = this.currentBook.countryId;
      this.curCityId = this.currentBook.cityId;
      this.curCompanyId= this.currentBook.companyId;

      this.isNewBook = this.httpWorkService.setReadBookMode()
    }
    
  }

  ngOnDestroy(): void {
    this.isNewBook = this.httpWorkService.setNewBookMode()
    this.httpWorkService.nullBook()  
  }

  editedBook(){


    let book = new BookModel();
    console.log(this.currentBook)
    book.id = this.currentBook.id;
    book.author = this.curAuthor;
    book.isbn = this.curIsbn
    book.title = this.curTitle;
    book.price = this.curPrice;
    book.pages = this.curPages;
    book.cityId = this.curCityId;
    book.countryId = this.curCountryId;
    book.description =this.curDescription;
    this.httpWorkService.putEditBook(book).subscribe(res=>{
      console.log(res)
    })
  }

  createNewBook(){
    let book = new BookModel();
    console.log(this.currentBook)
    book.id = this.lastID;
    book.author = this.newAuthor;
    book.isbn = this.newIsbn
    book.title = this.newTitle;
    book.price = this.newPrice;
    book.pages = this.newPages;
    book.cityId = this.newCityId;
    book.countryId = this.newCountryId;
    book.description =this.newDescription;
    console.log(book)
    this.httpWorkService.postBook(book).subscribe(res=>{
      console.log(res)
    })
  }


}
