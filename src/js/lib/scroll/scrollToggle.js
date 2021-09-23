import {gsap} from "gsap/gsap-core";
import ScrollTrigger from "gsap/ScrollTrigger";


export default class ScrollToggle{
    constructor() {
        this.init();
    }

    init() {
        gsap.utils.toArray('.motion').forEach(el=>{
            ScrollTrigger.create({
                trigger: el,
                start: 'top center+=45%',
                end: 'bottom top',
                toggleClass: 'onTrans',
                markers: false,
                id: el.className + '_toggle',
                once: true
                // onToggle: (self) => this.addMotionClass(self),
                // onLeave:  (self) => this.removeMotionClass(self)
            })
        })
    }

    addMotionClass(el) {
        if (!(el.trigger.classList.contains('onTrans'))) {
            el.trigger.classList.add('onTrans');
        }
    }

    removeMotionClass(el) {
        console.log('---end');
        if (!(el.trigger.classList.contains('onTrans'))) {
            el.trigger.classList.remove('onTrans');
        }
    }
}
