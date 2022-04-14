import {BASE_URL, handleAPIError} from "../utils";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function getCategories(){
    const options = {
        url: BASE_URL + '/categories?skip=0&limit=100',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };

    axios(options)
        .then(response => {
            AsyncStorage.setItem(
                'categoriesResult', JSON.stringify({
                    'status': 'SUCCESS',
                    'detail': response.data,
                })
            )
        })
        .catch(error => handleAPIError(error, 'categoriesResult'));

    return 'categoriesResult'
}