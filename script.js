document.addEventListener("DOMContentLoaded", function() {
    // Get the button and hands elements
    const button = document.querySelector('.call-to-action-button');
    const leftHand = document.querySelector('.left-hand');
    const rightHand = document.querySelector('.right-hand');

    // Define the hover effect
    button.addEventListener('mouseover', function() {
        leftHand.style.transform = 'translateX(1vw)';
        rightHand.style.transform = 'translateX(-1vw)';
    });

    // Reset the positions on mouseout
    button.addEventListener('mouseout', function() {
        leftHand.style.transform = 'translateX(0)';
        rightHand.style.transform = 'translateX(0)';
    });

    // Define the mousedown effect
    button.addEventListener('mousedown', function() {
        leftHand.style.transform = 'translateX(2vw)';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById('overlay');
    const leftHand = document.querySelector('.left-hand');
    const rightHand = document.querySelector('.right-hand');

    // Trigger overlay to show and animate hands on page load
    window.onload = function() {
        overlay.style.display = 'flex'; // Show the overlay
        // Apply initial transition for the animation
        leftHand.style.transition = 'transform 4s ease-in-out';
        rightHand.style.transition = 'transform 4s ease-in-out';

        leftHand.style.transform = 'translateX(0)'; // Slide in left hand
        rightHand.style.transform = 'translateX(0)'; // Slide in right hand

        // Reset the transition after the initial animation
        setTimeout(function() {
            overlay.style.opacity = '0';
            leftHand.style.transition = 'transform 0.7s ease-in-out';
            rightHand.style.transition = 'transform 0.7s ease-in-out';
            overlay.style.zIndex = '-1';
            // overlay.style.display = 'none';
        }, 4500);
    };
});




function scrollDown() {
    document.querySelector('.content').scrollBy({
        top: canvas.height * 0.70,
        behavior: 'smooth'
    });
}

setup();
draw(1);

document.getElementById('arrow').addEventListener('click', scrollDown);
