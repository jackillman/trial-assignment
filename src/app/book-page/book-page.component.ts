import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html'
})
export class BookPageComponent implements OnInit {
  isNewBook = false;
  constructor() { }

  ngOnInit() {
  }

}
