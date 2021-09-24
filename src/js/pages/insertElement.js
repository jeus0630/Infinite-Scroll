export default class{

    constructor(arr,el) {
        this._arr = arr;
        this._el = el;
    }

    insert(){
        this._arr.forEach(el=>{
            this._el.insertAdjacentHTML('beforeend',el);
        })
    }

}