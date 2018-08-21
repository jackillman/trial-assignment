import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URLSearchParams} from '@angular/http';
import { BookModel, FormatsModel, CitiesModel } from '../shared/models';



@Injectable()
export class HttpWorkService {


  constructor(private http : HttpClient) { }
  token = "bad18eba1ff45jk7858b8ae88a77fa30";
  currentBook;
  isNewBook = true
  url__books = "http://localhost:3004/books";
  url__formats = "http://localhost:3004/formats";
  url__countries = "http://localhost:3004/countries";
  url__cities = "http://localhost:3004/cities";
  url__publishers = "http://localhost:3004/publishers";
  url__companies = "http://localhost:3004/companies";
  
    myHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
      .set("x-auth-token",this.token)
      .set("Accept","*/*");
    
    deleteBook(id){
        return this.http.delete<BookModel>(this.url__books + "/" + id, {headers:this.myHeaders})
    }
    getBooks(){
        console.log(this.url__books)
        return this.http.get<BookModel>(this.url__books, {headers:this.myHeaders})
    }
    getFormats(){
        console.log(this.url__formats)
        return this.http.get<FormatsModel>(this.url__formats, {headers:this.myHeaders})
    }
    getCountries(){
        console.log(this.url__countries)
        return this.http.get<FormatsModel>(this.url__countries, {headers:this.myHeaders})
    }
    getCities(){
        console.log(this.url__cities)
        return this.http.get<CitiesModel>(this.url__cities, {headers:this.myHeaders})
    }  

    getCompanies(){
        console.log(this.url__companies)
        return this.http.get<CitiesModel>(this.url__companies, {headers:this.myHeaders})
    }  

    putEditBook(book){
        let body =JSON.stringify(book)
        console.log(body)
        return this.http.put<CitiesModel>(this.url__books +"/"+ book.id , body, {headers:this.myHeaders})
    }

   postBook(book){
        let body =JSON.stringify(book)
        console.log(body)
        return this.http.post<CitiesModel>(this.url__books , body, {headers:this.myHeaders})
    }

    writeCurrentBook(book){
        this.currentBook = book;
        console.log(this.currentBook)
    }

    nullBook(){
        this.currentBook = null
    }

    getCurrentBook(){
        return this.currentBook;
    }

    setNewBookMode(){
        return true
    }

    setReadBookMode(){
        return false;
    }

    searchingByParams(bookSearch){
      
        let body = this.convert(bookSearch)
        console.log(body)
        let url = this.url__books + body
        console.log(url)
        return this.http.get<BookModel>(url , {headers:this.myHeaders })
    }



    convert(a){
        if( typeof(a) !== 'object' ) 
            return '';
        return `?${Object.keys(a).map(k=>`${k}=${a[k]}`).join('&')}`;
    }
}
