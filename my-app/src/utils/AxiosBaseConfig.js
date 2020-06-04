import axios from 'axios';

export default function AxiosBaseConfig() {
  return axios.create({
    baseURL: 'http://localhost:5000/api',
  });
}
