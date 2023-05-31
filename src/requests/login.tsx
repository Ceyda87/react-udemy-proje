import axios from 'axios';
import { apiUrl } from './apiconfig';

export type LoginModelType = {
    userName: string;
    password: string;
}
export const submitHandle= (e: React.FormEvent<HTMLFormElement>,loginModel:LoginModelType) => {
        e.preventDefault();
        //console.log(loginModel);

        const promise= axios.get('${apiUrl}/Auth?userName=${loginModel.userName}&password=${loginModel.password}');
        const dataPromise = promise.then((response)=> response.data);
        return dataPromise;
       
    }

    export const checkToken = (token:string) =>{
        const promise = axios.get('${apiUrl}/Auth/ValidateToken?token=${token}');
        const dataPromise = promise.then((response)=> response.
        data);
        return dataPromise;
    }