import {isMobile} from "./globalVars";
import ScrollControl from "../lib/scroll/scrollControl";
export default class page {

    isMobile = isMobile(innerWidth);

    constructor() {
        this.init();
    }

    init() {
        this.scrollControl = new ScrollControl();

        if(this.isMobile) document.querySelector('#main').classList.add('mobile');

        this.addResizeEvent();
    }

    addResizeEvent(){
        window.addEventListener('resize',()=>{
            if(isMobile(innerWidth)){
                document.querySelector('#main').classList.add('mobile');
            }else{
                document.querySelector('#main').classList.remove('mobile');
            }
        })
    }
}
