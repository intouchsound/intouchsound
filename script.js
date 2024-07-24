const handPositions = {"desktop": {"start": 45, "normal": 15, "hover": 1, "click1": 4, "click2": 4},
    "mobile": {"start": 55, "normal": 3, "hover": 1, "click1": 4, "click2": 4}}

function updateHandPosition(action) {
    const viewportWidth = window.innerWidth;
    if (action === "away") {
        if (viewportWidth < 1024) {
            leftHand.style.transform = `translateX(-${handPositions.mobile.normal}vw)`;
            rightHand.style.transform = `translateX(${handPositions.mobile.normal}vw)`;
        } else {
            leftHand.style.transform = `translateX(-${handPositions.desktop.normal}vw)`;
            rightHand.style.transform = `translateX(${handPositions.desktop.normal}vw)`;;
        }
    }
    else if (action === "over") {
        if (viewportWidth < 1024) {
            leftHand.style.transform = `translateX(${handPositions.mobile.hover - handPositions.mobile.normal}vw)`;
            rightHand.style.transform = `translateX(${handPositions.mobile.normal - handPositions.mobile.hover}vw)`;
        } else {
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

document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.call-to-action-button');
    const leftHand = document.querySelector('.left-hand');
    const rightHand = document.querySelector('.right-hand');
    const overlay = document.getElementById('overlay');
    const loadPercentage = document.getElementById('loadPercentage');
    const backgroundVideo = document.getElementById('backgroundVideo');
    const callToActionContainer = document.getElementById('callToActionContainer');
    const duration = 2500;



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
    var handsContainer = document.getElementById('handsContainer');
    function step(timestamp) {
        if (!start) {
            start = timestamp;
        }
        const elapsed = timestamp - start;

        if (elapsed < duration) {
            const progress = elapsed / duration;
            loadPercentage.textContent = Math.min(Math.round(progress * progress * 100), 100) + "%";
            if (loadPercentage.textContent === "50%") {
                handsContainer.style.transition = 'opacity 2s ease-in-out;'
                handsContainer.style.opacity = '1';
            }
            window.requestAnimationFrame(step);
        } else {
            loadPercentage.textContent = '100%';
            loadPercentage.classList.add('pulse');
            setTimeout(endLoading, 500);
        }
    }

    function endLoading() {
        overlay.style.opacity = '0';
        handsContainer.style.opacity = '1';

        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.zIndex = '-1';
            callToActionContainer.style.zIndex = '10000';
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

document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('backgroundVideo');
    var fallbackImage = document.getElementById('backgroundImage');
    var handsContainer = document.getElementById('handsContainer');

    function calculatePositionForWidthPercentage(percentage, isNegative) {
        const position = (percentage / 100) * window.innerWidth;
        return (isNegative ? -position : position) + 'px';
    }

    // Attempt to play the video
    var playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {

        }).catch(error => {
            video.style.display = 'none';
            fallbackImage.style.display = 'block';
            handsContainer.style.opacity = '0'
            console.log(handsContainer)
            setTimeout(() => {
            }, 1000);

        });
    }
});
