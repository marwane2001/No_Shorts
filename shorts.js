// ==UserScript==
// @name         Hide YouTube Shorts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  No Shorts For You!
// @author       You
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Helper function to hide elements based on a query selector
    function hideElements(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => element.style.display = 'none');
    }

    // MutationObserver to detect changes in the DOM
    const observer = new MutationObserver(() => {
        // Hide "#shorts" videos
        hideElements('ytd-grid-video-renderer:has(#video-title:contains("#shorts"))');
        hideElements('ytd-grid-video-renderer:has(#video-title:contains("#Shorts"))');
        hideElements('ytd-grid-video-renderer:has(#video-title:contains("#short"))');
        hideElements('ytd-grid-video-renderer:has(#video-title:contains("#Short"))');

        // Hide videos with the shorts indicator on the thumbnail
        hideElements('ytd-grid-video-renderer:has([overlay-style="SHORTS"])');
        hideElements('ytd-rich-item-renderer:has([overlay-style="SHORTS"])');
        hideElements('ytd-video-renderer:has([overlay-style="SHORTS"])');
        hideElements('ytd-item-section-renderer.ytd-section-list-renderer[page-subtype="subscriptions"]:has(ytd-video-renderer:has([overlay-style="SHORTS"]))');

        // Hide shorts button in sidebar
        hideElements('ytd-guide-entry-renderer:contains("Shorts")');
        hideElements('ytd-mini-guide-entry-renderer:contains("Shorts")');

        // Hide shorts section on homepage
        hideElements('ytd-rich-section-renderer:has(#rich-shelf-header:contains("Shorts"))');
        hideElements('ytd-reel-shelf-renderer:has(.ytd-reel-shelf-renderer:contains("Shorts"))');

        // Hide shorts tab on channel pages
        hideElements('tp-yt-paper-tab:has(.tp-yt-paper-tab:contains("Shorts"))');
        hideElements('yt-tab-shape:contains("Shorts")');

        // Hide shorts in video descriptions
        hideElements('ytd-reel-shelf-renderer.ytd-structured-description-content-renderer:contains("Shorts remixing this video")');

        // Remove empty spaces in grid
        const gridRows = document.querySelectorAll('ytd-rich-grid-row,#contents.ytd-rich-grid-row');
        gridRows.forEach(row => row.style.display = 'contents');
    });

    // Start observing the body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Run the observer initially
    observer.takeRecords();
})();
