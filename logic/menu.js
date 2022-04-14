import {BASE_URL, handleAPIError} from "../utils";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function searchMenusByCategories(categoryId){
    const options = {
        url: BASE_URL + '/search/menus?category_id=' + categoryId,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };

    axios(options)
        .then(response => {
            AsyncStorage.setItem(
                'searchMenusResult', JSON.stringify({
                    'status': 'SUCCESS',
                    'detail': response.data,
                })
            )
        })
        .catch(error => handleAPIError(error, 'searchMenusResult'));

    return 'searchMenusResult'
}

export function getMenu(menuId){
    const options = {
        url: BASE_URL + '/menus/' + menuId,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };

    axios(options)
        .then(response => {
            AsyncStorage.setItem(
                'getMenuResult', JSON.stringify({
                    'status': 'SUCCESS',
                    'detail': response.data,
                })
            )
        })
        .catch(error => handleAPIError(error, 'getMenuResult'));

    return 'getMenuResult'
}


