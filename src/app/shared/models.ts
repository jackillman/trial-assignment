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

    price_lte?:any;
    price_gte?:any;
    pages_lte?:any;
    pages_gte?:any;
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