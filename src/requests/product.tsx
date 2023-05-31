import axios from "axios";
import { apiUrl } from "./apiconfig";

let options = {
    method: '',
    url: apiUrl,
    headers: {
        Authorization:'',
        contentType:''
    },
    data: {}
}
    export type productType = {
        id:number,
        name:string,
        description:string,   
        price:number,
        image:string
    }
export const getProducts = (token: string | null) => {
    options.headers.Authorization = 'Bearer ${token}';
    options.method= 'GET';
    options.url='${apiUrl}/Product';
    
    const promise= axios.request(options);
    const dataPromise = promise.then((response)=>response.data);
    return dataPromise;
}
export const getProduct= (token:string| null,id:number) =>{
    options.headers.Authorization = 'Bearer ${token}';
    options.method= 'GET';
    options.url='${apiUrl}/Product/${id}';

    const promise= axios.request(options);
    const dataPromise = promise.then((response)=>response.data);
    return dataPromise;
}
export const changeDetailProduct=(token:string|null, product:{id: number, name: string, price:number, image: string})=>{
    options.headers.Authorization = 'Bearer ${token}';
    options.method= 'PUT';
    options.url='application/json';
    options.url = '${apiUrl}/product';
    options.data = product;

    const promise = axios.request(options);
    const dataPromise = promise.then((response)=>response.data);
    return dataPromise;

}
