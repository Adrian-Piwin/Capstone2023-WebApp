var toastTimeoutId = null;

export function Toast(str, timeToShow){
    var snackbarElm = document.getElementById("snackbar");

    clearTimeout(toastTimeoutId);
    snackbarElm.innerHTML = str;
    PlayAnimation(snackbarElm, 'fadein 0.5s, fadeout 0.5s', timeToShow-0.5);
    snackbarElm.style.visibility = 'visible';

    toastTimeoutId = setTimeout(() => 
    {
        snackbarElm.style.visibility = 'hidden';
    }, timeToShow * 1000);
}

export function PlayAnimation(element, animName, time, animSetting=''){
    element.style.animation = '';
    element.offsetWidth;
    element.style.animation = animName + ' ' + ( animSetting == '' ? '' : (animSetting + ' ')) + time + 's';
    element.style.animationFillMode = "forwards"
}