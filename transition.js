(function () {
    // Create the curtain overlay
    const curtain = document.createElement('div');
    curtain.className = 'page-curtain';
    document.body.appendChild(curtain);

    // On page load: if we arrived via a transition, reveal the page
    if (sessionStorage.getItem('transitioning')) {
        sessionStorage.removeItem('transitioning');
        curtain.style.transform = 'translateX(0)';
        // Double RAF ensures the browser paints the covered state before animating out
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                curtain.classList.add('out');
            });
        });
    }

    function navigate(url) {
        if (sessionStorage.getItem('transitioning')) return;
        sessionStorage.setItem('transitioning', '1');
        curtain.classList.add('in');
        setTimeout(() => { window.location.href = url; }, 560);
    }

    // Expose globally so scroll-based navigation in other scripts can use it
    window.navigateTo = navigate;

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('a[href="Portfolio.html"]').forEach(link =>
            link.addEventListener('click', e => { e.preventDefault(); navigate('Portfolio.html'); })
        );

        document.querySelectorAll('a[href="index.html"]').forEach(link =>
            link.addEventListener('click', e => { e.preventDefault(); navigate('index.html'); })
        );

        const backButton = document.querySelector('.back-button');
        if (backButton) backButton.addEventListener('click', e => {
            e.preventDefault(); navigate('index.html#contact');
        });
    });
})();
