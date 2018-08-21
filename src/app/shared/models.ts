export class BookModel{
    id:string;
    author:string;
    title:string;
    isbn:string;
    pages:number;
    countryId:number;
    cityId:number;
    companyId:any;
    formatId:number;
    description:string;
    price:number;

    _priceStart?:any;
    _priceEnd?:any;
    _pageStart?:any;
    _pageEnd?:any;
}

export class FormatsModel {
    id:number;
    name:string;
}

export class CountriesModel {
    id:number;
    name:string; 
}

export class CitiesModel {
    id:number;
    countryId:number
    name:string; 
}