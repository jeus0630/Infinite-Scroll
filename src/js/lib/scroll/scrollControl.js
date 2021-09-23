import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import {CUSTOM_SCROLL, CUSTOM_SCROLL_LOCK, isDesktop, scrollSetting} from "../../common/globalVars";
import ScrollToggle from "./scrollToggle";

export default class ScrollControl {
    constructor() {
        this.setAppFix();
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        if (scrollSetting.smooth) {
            this.setHeight();
            this.setSmoothControl();
        } else {
            this.setControl();
        }

        window.onhashchange = ()=>{this.onHashChangeHandler()};
        new ScrollToggle();
        this.onResizeHandler();
        window.addEventListener(CUSTOM_SCROLL_LOCK, (e) => this.onScrollLockHandler(e));
    }

    getHashScrollY() {
        if (scrollSetting.smooth) {
            let hash = window.location.hash.split('#')[1];
            if (hash) {

                let el = document.getElementById(hash);
                if (el) {
                    return el.offsetTop;
                }
            }
        }

        return 0;
    }


    setHeight() {
        this.height = this.container.clientHeight;
        document.body.style.height = this.height + 'px';
    }

    setAppFix() {
        if (scrollSetting.smooth) {
            let viewport = document.querySelector('.viewport');
            viewport.style.position = 'fixed';
            viewport.style.height = '100%';
        }
        this.container = document.querySelector('.app');
    }

    setControl() {
        window.addEventListener('scroll', (e)=>this.onScrollHandler(e));
    }

    setHashControl() {
        let hashY = this.getHashScrollY();
        if (hashY !== 0) {
            history.scrollRestoration = 'manual';
            window.scrollTo(0,this.getHashScrollY());
        } else {
            history.scrollRestoration = 'auto';
        }
    }

    onHashChangeHandler(e) {
        // console.log('hashChange!');
        let hashY = this.getHashScrollY();
        if (hashY !== 0) {
            history.scrollRestoration = 'manual';
            window.scrollTo(0, this.getHashScrollY());
        }
    }

    setSmoothControl() {
        window.addEventListener( 'resize', (e) => {this.onResizeHandler(e)});

        // this.setControl();
        this.setHashControl();

        gsap.fromTo(this.container, {y:0}, {
            y: () => -(this.height - document.documentElement.clientHeight),
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: scrollSetting.scrub,
                invalidateOnRefresh: true,
                markers: scrollSetting.markers,
                onRefresh: self => {
                    // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
                    gsap.killTweensOf(self.animation);
                    self.animation.progress(self.progress);
                }
            },
            onUpdate: self =>{
                this.render(self);
            }
        });
    }

    render() {
        // transform 정수로 변환 부분
        // gsap.set(this.container, {y:Math.round(tmpY)})
        // let y = Math.round(gsap.getProperty(this.container, 'y'));

        let y =gsap.getProperty(this.container, 'y');
        let evt = new CustomEvent(CUSTOM_SCROLL, {detail:y*-1});
        window.dispatchEvent(evt);
    }

    onScrollHandler() {
        // console.log('>> scroll!!')
        let y = this.scrollTop = window.scrollY;
        let evt = new CustomEvent(CUSTOM_SCROLL, {detail:y});
        window.dispatchEvent(evt);
    }

    onResizeHandler() {
        if (scrollSetting.smooth) {
            this.setHeight();
        }
        this.onScrollHandler();
    }

    onScrollLockHandler(e) {
        let viewport = document.querySelector('.viewport');
        if (e.detail) {
            console.log('custom scroll lock');
            this.scrollSave = this.scrollTop;
            if (scrollSetting.smooth) {
                document.body.style.height = '100vh';
                viewport.style.height = '100vh';
            } else {
                viewport.style.overflow = 'hidden';
            }
        } else {
            console.log('custom scroll unlock');
            if (scrollSetting.smooth) {
                this.onResizeHandler();
            } else {
                viewport.style.overflow = 'visible';
            }
            window.scrollTo(0, this.scrollSave);
        }
    }
}
