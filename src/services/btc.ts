import axios from 'axios';
import { quickSort } from '../utils/sorting';

const API_URL = import.meta.env.VITE_API_URL as string;

export const getBTCData = async () => {
    return axios.get(API_URL).then((response) => {
        let sortedData = quickSort(response.data);
        return sortedData;
    }).catch(() => {
        alert(`Could not retrieve BTC information`)
    });
}