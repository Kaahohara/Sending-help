import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8090';
axios.defaults.headers.common['Origin'] = 'http://localhost:8082';
