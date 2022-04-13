import {BASE_URL, handleAPIError} from "../utils";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function register(email, firstName, lastName, password){
    const options = {
        url: BASE_URL + '/users/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            'email': email, 'first_name': firstName, 'last_name': lastName, 'password': password
        }
    };

    axios(options)
        .then(response => {
            AsyncStorage.setItem(
                'signUpResult', JSON.stringify({
                    'status': 'SUCCESS',
                    'detail': response.email,
                })
            )
        })
        .catch(error => handleAPIError(error, 'signUpResult'));

    return 'signUpResult'
}


export function login(email, password){
    const options = {
        url: BASE_URL + '/users/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            'email': email, 'password': password
        }
    };

    axios(options)
        .then(response => {
            AsyncStorage.setItem(
                'loginResult', JSON.stringify({
                    'status': 'SUCCESS',
                    'detail': response.access_token,
                })
            )
        })
        .catch(error => handleAPIError(error, 'loginResult'));

    return 'loginResult'
}