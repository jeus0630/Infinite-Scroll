
export default class {
    // wewf
    static addScrollMotion(el){
        const config = {
            root : null,
            rootMargin : '0px 0px 0px 0px',
            threshold : 0
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const {isIntersecting, target} = entry;

                if(isIntersecting){
                    target.classList.add('onTrans');
                }

            })
        },config)

        el.forEach(el=>{
            observer.observe(el);
        })

    }

    static triggerLazyLoading(el){
        const config = {
            root : null,
            rootMargin : '0px 0px 50% 0px',
            threshold : 0,
        };

        const observer = new IntersectionObserver(entries=>{
            entries.forEach(entry=>{
                const {isIntersecting, target} = entry;

                if(isIntersecting){
                    target.childNodes[1].src = target.childNodes[1].dataset.src || target.childNodes[1].src;
                    observer.unobserve(target);
                }

            })
        },config)

        el.forEach(el=>{
            observer.observe(el);
        })
    }

}