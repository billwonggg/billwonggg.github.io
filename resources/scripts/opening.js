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
            }, (idx + 1) * 40)
        })
    }, 3300);

    setTimeout(() => {
        intro.style.top = '-100vh';
    }, 3600);

    setTimeout(() => {
        resetScroll();
    }, 3650);   
})
