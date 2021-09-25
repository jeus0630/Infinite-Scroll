import fetchData from "./fetchData";
import liElement from "./liElement";
import page from "../common/page";
import intersectonObserver from "../lib/scroll/intersectonObserver";

export default class Index extends page{

    _api_key = 'api_key=z6L3XolMeCUOQ6LqTGqgWyyGF4YtA4Qxsdsmnda2';
    _count = 10;

    async getData(){
        const addr = `https://api.nasa.gov/planetary/apod?${this._api_key}&count=${this._count}`
        this._fetchData = await new fetchData(addr).fetchData();

        this.appendElements();
    }

    appendElements(){
        const el = this._fetchData.map((el,idx)=>{
            if(idx<4) return new liElement(el).li;
            else return new liElement(el).liLazy;
        }).join('');

        const target = document.querySelector('.list');
        target.insertAdjacentHTML('beforeend',el);

        this.addScrollEvent();
    }

    addScrollEvent(){
        const motions = document.querySelectorAll('.motion');
        intersectonObserver.addScrollMotion(motions);

        const images = document.querySelectorAll('.img-wrap');
        intersectonObserver.triggerLazyLoading(images);
    }

}

(function(){
    new Index().getData();
})();