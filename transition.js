(function() {
    function navigate(url) {
        document.body.classList.add('transitioning');
        setTimeout(() => window.location.href = url, 500);
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('a[href="Portfolio.html"]').forEach(link =>
            link.addEventListener('click', e => { e.preventDefault(); navigate('Portfolio.html'); })
        );

        document.querySelectorAll('a[href="index.html"]').forEach(link =>
            link.addEventListener('click', e => { e.preventDefault(); navigate('index.html'); })
        );

        const backButton = document.querySelector('.back-button');
        if (backButton) backButton.addEventListener('click', e => {
            e.preventDefault(); navigate('index.html');
        });
    });
})();
