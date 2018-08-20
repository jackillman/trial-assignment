export class BookModel{
    id:string;
    author:string;
    title:string;
    isbn:string;
    pages:number;
    countryId:number;
    cityId:number;
    companyId:number;
    formatId:number;
    description:string;
    price:number;
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