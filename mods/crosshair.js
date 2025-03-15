
// ==UserScript==
// @name         GeoFS Crosshair Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds two crosshairs to GeoFS: one for the plane and one for the mouse.
// @author       redlarvaoioi
// @match        *://www.geo-fs.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create crosshair elements
    const planeCrosshair = document.createElement('div');
    const mouseCrosshair = document.createElement('div');

    planeCrosshair.style.position = 'absolute';
    planeCrosshair.style.width = '10px';
    planeCrosshair.style.height = '10px';
    planeCrosshair.style.border = '2px solid white';
    planeCrosshair.style.borderRadius = '50%';
    planeCrosshair.style.zIndex = '10000';

    mouseCrosshair.style.position = 'absolute';
    mouseCrosshair.style.width = '20px';
    mouseCrosshair.style.height = '20px';
    mouseCrosshair.style.border = '2px solid white';
    mouseCrosshair.style.borderRadius = '50%';
    mouseCrosshair.style.zIndex = '10000';

    document.body.appendChild(planeCrosshair);
    document.body.appendChild(mouseCrosshair);

    // Update mouse crosshair position
    document.addEventListener('mousemove', (event) => {
        mouseCrosshair.style.left = `${event.clientX - 10}px`;
        mouseCrosshair.style.top = `${event.clientY - 10}px`;
    });

    // Update plane crosshair position
    function updatePlaneCrosshair() {
        // Get plane position and tilt (this part may need adjustment based on GeoFS APIs)
        const plane = geofs.aircraft.instance;
        if (plane) {
            const screenPosition = geofs.utils.convertCoordToScreen(plane.position);
            planeCrosshair.style.left = `${screenPosition.x - 5}px`;
            planeCrosshair.style.top = `${screenPosition.y - 5}px`;
        }
        requestAnimationFrame(updatePlaneCrosshair);
    }
    updatePlaneCrosshair();

    // Check if crosshairs are on a username
    function checkUsernameCollision() {
        const usernames = document.querySelectorAll('.username'); // Adjust the selector as needed
        usernames.forEach(username => {
            const rect = username.getBoundingClientRect();
            const planeRect = planeCrosshair.getBoundingClientRect();
            const mouseRect = mouseCrosshair.getBoundingClientRect();

            if (rect.intersects(planeRect) || rect.intersects(mouseRect)) {
                planeCrosshair.style.borderColor = 'red';
                mouseCrosshair.style.borderColor = 'red';
            } else {
                planeCrosshair.style.borderColor = 'white';
                mouseCrosshair.style.borderColor = 'white';
            }
        });
        requestAnimationFrame(checkUsernameCollision);
    }
    checkUsernameCollision();

})();
