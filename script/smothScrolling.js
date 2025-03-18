
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        const targetId = this.getAttribute('href').substring(1); // Get section ID
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            slowScrollTo(targetElement.offsetTop - 50, 2000); // Adjust speed (1000ms = 1 sec)
        }
    });
});

// Custom smooth scrolling function
function slowScrollTo(targetPosition, duration) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animationStep(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Ensure it stops at target

        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

        if (progress < 1) {
            requestAnimationFrame(animationStep);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Easing function
    }

    requestAnimationFrame(animationStep);
}

