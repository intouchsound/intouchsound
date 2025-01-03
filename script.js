document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.call-to-action-button');
    const leftHand = document.querySelector('.left-hand');
    const rightHand = document.querySelector('.right-hand');
    const overlay = document.getElementById('overlay');
    const loadPercentage = document.getElementById('loadPercentage');
    const backgroundVideo = document.getElementById('backgroundVideo');
    const callToActionContainer = document.getElementById('callToActionContainer');
    const callToActionButton = document.getElementById('callToActionButton');
    const duration = 2500;
    var clickCount = 0;

    const handPositions = {"desktop": {"start": 45, "normal": 15, "hover": 1, "click1": 4, "click2": 4},
                            "mobile": {"start": 55, "normal": 3, "hover": 1, "click1": 4, "click2": 4}}

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
        else if (action === "start") {
            //this means button was hovered over
            if (viewportWidth < 1024) {
                // For mobile devices, adjust hand position to not roll out completely
                leftHand.style.transform = `translateX(-${handPositions.mobile.start}vw)`;
                rightHand.style.transform = `translateX(${handPositions.mobile.start}vw)`;
            } else {
                // For desktop, restore original extended position
                leftHand.style.transform = `translateX(-${handPositions.desktop.start}vw)`;
                rightHand.style.transform = `translateX(${handPositions.desktop.start}vw)`;
            }
        }

    }

    function incrementPercentage(element, targetPercentage, updateInterval) {
        let currentPercentage = parseInt(element.textContent) || 0; // Parse the current percentage or default to 0
        if (currentPercentage < targetPercentage) {
            // Increment the current percentage
            element.textContent = currentPercentage + 1 + "%";
            // Schedule the next increment
            setTimeout(() => incrementPercentage(element, targetPercentage, updateInterval), updateInterval);
        }
    }

    // Add event listeners for hover effects
    button.addEventListener('mouseover', function() {
        updateHandPosition("over");
    });

    button.addEventListener('mouseout', function() {
        updateHandPosition("away");
    });

    button.addEventListener('click', function() {
        updateHandPosition("click1");
    });

    let start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        if (elapsed < duration) {
            const progress = elapsed / duration;
            loadPercentage.textContent = Math.min(Math.round(progress * progress * 100), 100) + "%";
            window.requestAnimationFrame(step);
        } else {
            loadPercentage.textContent = '100%';
            loadPercentage.classList.add('pulse');
            setTimeout(endLoading, 500);
        }
    }

    function endLoading() {
        overlay.style.opacity = '0';

        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.zIndex = '-1';
            callToActionContainer.style.zIndex = '10000';
            // loadPercentage.style.opacity = '0'
        }, 1000);
    }

    window.onload = function() {
        overlay.style.display = 'flex';
        leftHand.style.transition = 'transform 3s ease-in-out';
        rightHand.style.transition = 'transform 3s ease-in-out';
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
});

// document.addEventListener("DOMContentLoaded", function() {
//     const video = document.getElementById('backgroundVideo');
//     const image = document.getElementById('backgroundImage');
//
//     video.addEventListener('error', function() {
//         video.style.display = 'none';
//         image.style.display = 'block';  // Show the image if there is an error with the video
//     });
//
//     video.addEventListener('canplay', function() {
//         video.style.display = 'block';
//         image.style.display = 'none';  // Hide the image if the video can play
//     });
//
//     // Check if video has enough data to play
//     if (video.readyState < 3) {
//         video.style.display = 'none';
//         image.style.display = 'block';
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('backgroundVideo');
    var fallbackImage = document.getElementById('backgroundImage');

    // Attempt to play the video
    var playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Video is playing, do nothing
        }).catch(error => {
            // Video failed to play, show fallback image
            video.style.display = 'none'; // Hide the video
            fallbackImage.style.display = 'block'; // Show the fallback image
        });
    }
});
