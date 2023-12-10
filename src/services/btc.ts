import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL as string;

export const getBTCData = async () => {
    return axios.get(API_URL).then((response) => response.data).catch(() => {
        alert(`Could not retrieve BTC information`)
    });
}