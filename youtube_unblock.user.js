// ==UserScript==
// @name         YouTube Watch to Embed Redirect
// @namespace    http://your-namespace.com
// @version      0.1
// @description  Redirects YouTube watch links to embed links
// @author       You
// @match        https://www.youtube.com/watch*
// @grant        none
// @run-at       document-start
// @updateURL    https://github.com/censorliber/youtube_unblock/raw/refs/heads/main/youtube_unblock.user.js
// @downloadURL  https://github.com/censorliber/youtube_unblock/raw/refs/heads/main/youtube_unblock.user.js
// ==/UserScript==

(function() {
    'use strict';

    const currentUrl = window.location.href;
    const videoIdMatch = currentUrl.match(/v=([a-zA-Z0-9_-]+)/);

    if (videoIdMatch && videoIdMatch[1]) {
        const videoId = videoIdMatch[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        window.location.replace(embedUrl);
    }
})();
