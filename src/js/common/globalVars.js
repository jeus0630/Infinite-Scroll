const webWidth = 768;
const tabletWidth = 1024;

const LOTTIE_LOAD_COMPLETE = 'lottie_load_complete';
const CUSTOM_SCROLL = 'custom_scroll';
const CUSTOM_SCROLL_LOCK = 'custom_scroll_lock';
const PIN_SCROLL = 'pin_scroll';

let isHelp = false;
let scrollSetting = {
    smooth: false,
    scrub : true,
    markers : false
}

function isMobile(width) {
    return width < webWidth;
}

function isDesktop() {
    if (Detectizr.device.type === 'desktop') {
        if (Detectizr.device.model === 'mac') {
            if (navigator.maxTouchPoints > 1) {
                return false;
            }
        }
        return true;
    }

    //신형주 : 사내 노트북 ie11 을 타블랫으로 처리하는 부분 수정
    if (Detectizr.browser.name === 'ie' && Detectizr.browser.major === '11') {
        return true;
    }

    return false;
}
function isTablet(width) {
    return width <= tabletWidth;
}

function isDev() {
    return (/^127|^0|^192|localhost|ynj.designfever.com/).test(document.location.hostname);
}

// if (isDesktop()) {
//     scrollSetting.smooth = true;
//     scrollSetting.scrub = 1.0;
// }

console.log(Detectizr);
console.log(scrollSetting);
console.log('!!!!!!!!!!!!!!!!!!!!!!')
export {CUSTOM_SCROLL, CUSTOM_SCROLL_LOCK, PIN_SCROLL, LOTTIE_LOAD_COMPLETE, isMobile, isDesktop, isTablet, isDev, isHelp, scrollSetting};