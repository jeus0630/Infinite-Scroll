
export default class {

    static addScrollMotion(el){
        const config = {
            root : null,
            rootMargin : '0px',
            threshold : 0
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const {isIntersecting, target} = entry;

                if(isIntersecting){
                    target.classList.add('onTrans');

                    observer.unobserve(target);
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
                console.log(entry);
                const {isVisible, target} = entry;

                if(isVisible){
                    target.src = target.dataset.src || target.src;
                    observer.unobserve(target);
                }

            })
        },config)

        el.forEach(el=>{
            observer.observe(el);
        })
    }

}