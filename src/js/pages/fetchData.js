import axios from 'axios';

export default class {
    constructor(api) {
        this._api = api;
    }

    fetchData(){
        return axios.get(this._api)
            .then(res=>{
                return res.data;
            })
            .catch(()=>{
                throw new Error('Network Error');
            })
    }
}