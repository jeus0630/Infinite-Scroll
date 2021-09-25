
export default class{

    constructor({hdurl,title,date,explanation},i=0) {

        this._li = `<li class="item">
                            <div class="img-wrap motion">
                                <img src="${hdurl}" alt="Space picture">
                            </div>
                            <div class="txt">
                                <em class="tit motion">${title}</em>
                                <span class="date motion">${date}</span>
                                <p class="cont motion">
                                    ${explanation}
                                </p>
                                <button class="btn motion" data-click="false">
                                    <span>Like</span>
                                </button>
                            </div>
                        </li>`

        this._liLazy = `<li class="item">
                            <div class="img-wrap motion">
                                <img data-src="${hdurl}" alt="Space picture" class="img">
                            </div>
                            <div class="txt">
                                <em class="tit motion">${title}</em>
                                <span class="date motion">${date}</span>
                                <p class="cont motion">
                                    ${explanation}
                                </p>
                                <button class="btn motion" data-click="false">
                                    <span>Like</span>
                                </button>
                            </div>
                        </li>`

    }

    get li(){
        return this._li;
    }

    get liLazy(){
        return this._liLazy;
    }


}