import fetchData from "./fetchData";
import liElement from "./liElement";
import insertElement from "./insertElement";
import page from "../common/page";

export default class Index extends page{

    _api_key = 'api_key=z6L3XolMeCUOQ6LqTGqgWyyGF4YtA4Qxsdsmnda2';
    _count = 50;

    injectDependecy(){
        const addr = `https://api.nasa.gov/planetary/apod?${this._api_key}&count=${this._count}`
        this._fetchData = new fetchData(addr);

        this.retreiveDtaa();
    }

    async retreiveDtaa(){
        const arr = [];
        const el = document.querySelector('.list');

        const dataList = await this._fetchData.fetchData();

        dataList.forEach(el=>{
            arr.push(new liElement(el).li);
        })

        new insertElement(arr,el).insert();

    }

}

(function(){
    new Index().injectDependecy();
})();