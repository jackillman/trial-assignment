import { Component, OnInit } from '@angular/core';
import { HttpWorkService } from '../services/http-work.service';
import { BookModel } from '../shared/models';
import { HttpClient } from 'selenium-webdriver/http';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';


@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html'
})
export class ShowcaseComponent implements OnInit {
  subscription:Subscription;
  constructor(private httpWorkService:HttpWorkService,private router: Router) { }
  books:BookModel[] = [];
  ngOnInit() {
    this.subscription =this.httpWorkService.getBooks().subscribe(res=>{
      console.log(res)
      let arr = res;
      let someArray:BookModel[]=[];
      for(let i in arr){
        someArray.push(arr[i])
      }
      this.books = someArray
    })
  }

  redirectToBook(book){
    this.httpWorkService.writeCurrentBook(book);
    this.httpWorkService.setReadBookMode()
    this.router.navigate(
      ['/book/', book.id]

    );
  }

  deleteBook(id){
    this.httpWorkService.deleteBook(id).subscribe(res=>{
      console.log(res)
    })
  }

}
