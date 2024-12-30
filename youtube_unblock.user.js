// ==UserScript==
// @name         YouTube Watch to Embed Redirect (New Window)
// @namespace    http://your-namespace.com
// @version      0.3
// @description  Redirects YouTube watch links to embed links and opens them in a new window
// @author       You
// @match        https://www.youtube.com/*
// @grant        GM_openInTab
// @run-at       document-idle
// @updateURL    https://github.com/censorliber/youtube_unblock/raw/refs/heads/main/youtube_unblock.user.js
// @downloadURL  https://github.com/censorliber/youtube_unblock/raw/refs/heads/main/youtube_unblock.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Перенаправление текущей страницы
    if (window.location.href.startsWith('https://www.youtube.com/watch')) {
        const videoIdMatch = window.location.href.match(/v=([a-zA-Z0-9_-]+)/);
        if (videoIdMatch && videoIdMatch[1]) {
            const videoId = videoIdMatch[1];
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            GM_openInTab(embedUrl, { active: true }); // Открытие в новой вкладке
            window.close(); // Закрытие текущей вкладки
        }
    }

    // Обработка кликов на ссылках
    document.body.addEventListener('click', function(event) {
        let target = event.target;
        while (target && target.tagName !== 'A') {
            target = target.parentNode;
        }
        if (target && target.href && target.href.startsWith('https://www.youtube.com/watch')) {
            event.preventDefault(); // Отмена стандартного поведения
            const videoIdMatch = target.href.match(/v=([a-zA-Z0-9_-]+)/);
            if (videoIdMatch && videoIdMatch[1]) {
                const videoId = videoIdMatch[1];
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                GM_openInTab(embedUrl, { active: true }); // Открытие в новой вкладке
            }
        }
    });
})();
