
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

    static observe(el){
        const config = {
            root : null,
            rootMargin : '0px',
            threshold : 0,
        };

        const observer = new IntersectionObserver(entries=>{
            entries.forEach(entry=>{
                const {isIntersecting, target} = entry;

                if(isIntersecting){
                        target.src = target.dataset.src;
                }

            })
        },config)

        observer.observe(el);
    }

}