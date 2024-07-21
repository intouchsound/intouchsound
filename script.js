document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.call-to-action-button');
    const leftHand = document.querySelector('.left-hand');
    const rightHand = document.querySelector('.right-hand');
    const overlay = document.getElementById('overlay');
    const loadPercentage = document.getElementById('loadPercentage');
    const backgroundVideo = document.getElementById('backgroundVideo');
    const duration = 2500; // Loading duration in milliseconds

    button.addEventListener('mouseover', function() {
        leftHand.style.transform = 'translateX(1vw)';
        rightHand.style.transform = 'translateX(-1vw)';
    });

    button.addEventListener('mouseout', function() {
        leftHand.style.transform = 'translateX(0)';
        rightHand.style.transform = 'translateX(0)';
    });

    button.addEventListener('mousedown', function() {
        leftHand.style.transform = 'translateX(2vw)';
    });

    let start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        if (elapsed < duration) {
            const progress = elapsed / duration;
            const percent = Math.min(Math.round(progress * progress * 100), 100);
            loadPercentage.textContent = percent + '%';
            window.requestAnimationFrame(step);
        } else {
            loadPercentage.textContent = '100%';
            loadPercentage.classList.add('pulse'); // Add pulsing effect
            setTimeout(endLoading, 500); // Wait for half a second before fading out
        }
    }

    function endLoading() {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.zIndex = '-1';
        }, 1000); // Smooth transition to hide overlay
    }

    window.onload = function() {
        overlay.style.display = 'flex';
        leftHand.style.transition = 'transform 3s ease-in-out';
        rightHand.style.transition = 'transform 3s ease-in-out';
        leftHand.style.transform = 'translateX(0)';
        rightHand.style.transform = 'translateX(0)';

        setTimeout(() => {
            leftHand.style.transition = 'transform 0.7s ease-in-out';
            rightHand.style.transition = 'transform 0.7s ease-in-out';
        }, 3500);

        if (backgroundVideo.readyState >= 3) {
            window.requestAnimationFrame(step);
        } else {
            backgroundVideo.addEventListener('canplaythrough', () => {
                window.requestAnimationFrame(step);
            });
        }
    };
});


document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('backgroundVideo');
    const image = document.getElementById('backgroundImage');

    video.addEventListener('error', function() {
        video.style.display = 'none';
        image.style.display = 'block';  // Show the image if there is an error with the video
    });

    video.addEventListener('canplay', function() {
        video.style.display = 'block';
        image.style.display = 'none';  // Hide the image if the video can play
    });

    // Check if video has enough data to play
    if (video.readyState < 3) {
        video.style.display = 'none';
        image.style.display = 'block';
    }
});
