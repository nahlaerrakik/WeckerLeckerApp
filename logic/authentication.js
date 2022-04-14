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
    let details = {
        'username': email,
        'password': password,
    };

    let data = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        data.push(encodedKey + "=" + encodedValue);
    }
    data = data.join("&");

    const options = {
        url: BASE_URL + '/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json'
        },
        data: data
    };

    axios(options)
        .then(response => {
            AsyncStorage.setItem(
                'loginResult', JSON.stringify({
                    'status': 'SUCCESS',
                    'detail': response.data.access_token,
                })
            )

            AsyncStorage.setItem(
                'userInfo', JSON.stringify({
                    'email': email,
                    'token': response.data.access_token,
                })
            )
        })
        .catch(error => handleAPIError(error, 'loginResult'));

    return 'loginResult'
}