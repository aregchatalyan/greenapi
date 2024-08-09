import axios from 'axios';
import { config } from '../config';

const GREEN_API_BASE_URL = config.get('GREEN_API_BASE_URL');

export const $api = axios.create({
  baseURL: GREEN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  transformResponse: response => response.data
});
