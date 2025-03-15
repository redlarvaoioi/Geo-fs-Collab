
// ==UserScript==
// @name         GeoFS UI Enhancement
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds custom styles to enhance the UI of GeoFS
// @author       redlarvaoioi
// @match        *://www.geo-fs.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create a style element
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        /* Change the background color of the header */
        .header {
            background-color: #1a1a1a !important;
            color: #f1f1f1 !important;
        }

        /* Add some padding to the main content area */
        .main-content {
            padding: 20px !important;
        }

        /* Style the buttons */
        .button {
            background-color: #007bff !important;
            color: #fff !important;
            border: none !important;
            padding: 10px 20px !important;
            border-radius: 5px !important;
            cursor: pointer !important;
        }
        .button:hover {
            background-color: #0056b3 !important;
        }

        /* Add a box shadow to the panels */
        .panel {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
        }
    `;

    // Append the style element to the head
    document.head.appendChild(style);
})();
