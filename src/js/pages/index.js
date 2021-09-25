import axios from "axios";
import liElement from "./liElement";
import intersectionObserver from "../lib/scroll/intersectionObserver";
import page from "../common/page";


export default class Index extends page{

    async getData(){
        const api_key = 'api_key=z6L3XolMeCUOQ6LqTGqgWyyGF4YtA4Qxsdsmnda2';
        const count = 10;
        const addr = `https://api.nasa.gov/planetary/apod?${api_key}&count=${count}`

        try{
            const fetchData = await axios.get(addr).then(el=>el.data);
            this.appendElements(fetchData);
        }catch(error){
            console.error(error);
        }

    }

    appendElements(fetchData){
        const el = fetchData.map((el,idx,arr)=>{
            if(idx<4) return new liElement(el).li;
            else return new liElement(el).liLazy;
        }).join('');

        const target = document.querySelector('.list');
        target.insertAdjacentHTML('beforeend',el);

        this.addScrollEvent();
    }

    addScrollEvent(){
        const motions = document.querySelectorAll('.motion');
        intersectionObserver.addScrollMotion(motions);

        const images = document.querySelectorAll('.img-wrap');
        intersectionObserver.triggerLazyLoading(images);

        const fetchTrigger = document.querySelector('.fetch-trigger');
        intersectionObserver.fetchTrigger(fetchTrigger);
    }

}

(function(){
    new Index().getData();
})();