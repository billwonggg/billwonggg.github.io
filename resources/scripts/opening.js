let intro = document.querySelector('.opening');
let logo = document.querySelector('.opening-header');
let logoSpan = document.querySelectorAll('.hello');

const resetScroll = () => {
    window.scrollTo(0, 0);
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 500)          
        })
    });

    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.remove('active');
                span.classList.add('fade')
            }, (idx + 1) * 35)
        })
    }, 3700);

    setTimeout(() => {
        intro.style.top = '-100vh';
    }, 3700);

    setTimeout(() => {
        resetScroll();
    }, 3750);   
})
