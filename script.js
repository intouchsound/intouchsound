document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.call-to-action-button');
    const leftHand = document.querySelector('.left-hand');
    const rightHand = document.querySelector('.right-hand');
    const overlay = document.getElementById('overlay');
    const loadPercentage = document.getElementById('loadPercentage');
    const backgroundVideo = document.getElementById('backgroundVideo');
    const callToActionContainer = document.getElementById('callToActionContainer');
    const callToActionButton = document.getElementById('callToActionButton');
    const duration = 2500; // Loading duration in milliseconds
    var clickCount = 0;

    const handPositions = {"desktop": {"start": 45, "normal": 15, "hover": 1, "click1": 2, "click2": 4},
                            "mobile": {"start": 55, "normal": 3, "hover": 1, "click1": 2, "click2": 4}}

    function updateHandPosition(action) {
        const viewportWidth = window.innerWidth;
        if (action === "away") {
            //this means that mouse was moved away
            if (viewportWidth < 1024) {
                leftHand.style.transform = `translateX(-${handPositions.mobile.normal}vw)`;
                rightHand.style.transform = `translateX(${handPositions.mobile.normal}vw)`;
            } else {
                leftHand.style.transform = `translateX(-${handPositions.desktop.normal}vw)`;
                rightHand.style.transform = `translateX(${handPositions.desktop.normal}vw)`;;
            }
        }
        else if (action === "over") {
            //this means button was hovered over
            if (viewportWidth < 1024) {
                // For mobile devices, adjust hand position to not roll out completely
                leftHand.style.transform = `translateX(${handPositions.mobile.hover - handPositions.mobile.normal}vw)`;
                rightHand.style.transform = `translateX(${handPositions.mobile.normal - handPositions.mobile.hover}vw)`;
            } else {
                // For desktop, restore original extended position
                leftHand.style.transform = `translateX(${handPositions.desktop.hover - handPositions.desktop.normal}vw)`;
                rightHand.style.transform = `translateX(${handPositions.desktop.normal - handPositions.desktop.hover}vw)`;
            }
        }
        else if (action === "click1") {
            //this means button was hovered over
            if (viewportWidth < 1024) {
                // For mobile devices, adjust hand position to not roll out completely
                leftHand.style.transform = `translateX(${handPositions.mobile.click1 - handPositions.mobile.normal}vw)`;
                rightHand.style.transform = `translateX(${handPositions.mobile.normal - handPositions.mobile.click1}vw)`;
            } else {
                // For desktop, restore original extended position
                leftHand.style.transform = `translateX(${handPositions.desktop.click1 - handPositions.desktop.normal}vw)`;
                rightHand.style.transform = `translateX(${handPositions.desktop.normal - handPositions.desktop.click1}vw)`;
            }
        }
        else if (action === "click2") {
            //this means button was hovered over
            if (viewportWidth < 1024) {
                // For mobile devices, adjust hand position to not roll out completely
                leftHand.style.transform = `translateX(${handPositions.mobile.click2 - handPositions.mobile.normal}vw)`;
                rightHand.style.transform = `translateX(${handPositions.mobile.normal - handPositions.mobile.click2}vw)`;
            } else {
                // For desktop, restore original extended position
                leftHand.style.transform = `translateX(${handPositions.desktop.click2 - handPositions.desktop.normal}vw)`;
                rightHand.style.transform = `translateX(${handPositions.desktop.normal - handPositions.desktop.click2}vw)`;
            }
        }

    }

    button.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 1) {
            console.log(callToActionButton)
            callToActionButton.innerHTML = 'you ready?';
            updateHandPosition("click1")
            button.style.background = '#cacf85';
        } else if (clickCount === 2) {
            updateHandPosition("click2");
            overlay.style.display = 'flex';  // Make overlay visible
            overlay.style.zIndex = '1000000';  // Bring to front

            // Smoothly transition the opacity of the overlay
            setTimeout(function() {
                overlay.style.opacity = '1';  // Start the opacity transition
                setTimeout(function() {
                    window.location.href = 'https://intouchsound.com/signup';  // Redirect after the transition
                }, 500);  // Wait for the opacity to finish transitioning
            }, 10);  // Short delay to ensure the display has changed to 'flex'
        }
    });

    // Add event listeners for hover effects
    button.addEventListener('mouseover', function() {
        updateHandPosition("over");
    });

    button.addEventListener('mouseout', function() {
        updateHandPosition("away");
    });

    let start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        if (elapsed < duration) {
            const progress = elapsed / duration;
            loadPercentage.textContent = Math.min(Math.round(progress * progress * 100), 100);
            window.requestAnimationFrame(step);
        } else {
            loadPercentage.textContent = '100';
            loadPercentage.classList.add('pulse');
            setTimeout(endLoading, 500);
        }
    }

    function endLoading() {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.zIndex = '-1';
            callToActionContainer.style.zIndex = '10000'
        }, 1000);
    }

    window.onload = function() {
        overlay.style.display = 'flex';
        updateHandPosition("away");

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

    // Responsive adjustments when resizing the window
    window.addEventListener('resize', updateHandPosition);
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
