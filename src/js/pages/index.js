import fetchData from "./fetchData";
import liElement from "./liElement";
import insertElement from "./insertElement";
import page from "../common/page";
import intersectonObserver from "../lib/scroll/intersectonObserver";

export default class Index extends page{

    _api_key = 'api_key=z6L3XolMeCUOQ6LqTGqgWyyGF4YtA4Qxsdsmnda2';
    _count = 10;

    injectDependecy(){
        const addr = `https://api.nasa.gov/planetary/apod?${this._api_key}&count=${this._count}`
        this._fetchData = new fetchData(addr);

        this.retreiveData();
    }

    async retreiveData(){
        const arr = [];
        const el = document.querySelector('.list');

        const dataList = await this._fetchData.fetchData();

        dataList.forEach((el,idx)=>{

            // For lazy loadings
            if(idx < 4){
                arr.push(new liElement(el).li);
            }else{
                arr.push(new liElement(el).liLazy);
            }
        })

        new insertElement(arr,el).insert();

        this.addScrollEvent();
    }

    addScrollEvent(){
        const motions = document.querySelectorAll('.motion');
        intersectonObserver.addScrollMotion(motions);

        const images = document.querySelectorAll('img');
        intersectonObserver.triggerLazyLoading(images);
    }

}

(function(){
    new Index().injectDependecy();
})();