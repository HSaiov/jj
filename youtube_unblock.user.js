// ==UserScript==
// @name         YouTube Watch to Embed Redirect (New Window)
// @namespace    http://your-namespace.com
// @version      0.4
// @description  Redirects YouTube watch links to embed links and opens them in a new window
// @author       You
// @match        https://www.youtube.com/*
// @grant        GM_openInTab
// @run-at       document-idle
// @updateURL    https://zapret.now.sh/script.user.js
// @downloadURL  https://zapret.now.sh/script.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Функция для обработки ссылок
    function processLink(link) {
        if (!link.href.includes('/watch')) return;

        // Отмена стандартного поведения
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const videoIdMatch = link.href.match(/v=([a-zA-Z0-9_-]+)/);
            if (videoIdMatch && videoIdMatch[1]) {
                const videoId = videoIdMatch[1];
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                GM_openInTab(embedUrl, { active: true }); // Открыть в новой вкладке
            }
        });
    }

    // Обработка существующих ссылок
    function processExistingLinks() {
        const links = document.querySelectorAll('a[href*="/watch"]');
        links.forEach(processLink);
    }

    // Отслеживание новых ссылок через MutationObserver
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Проверяем, что это элемент
                        const links = node.querySelectorAll('a[href*="/watch"]');
                        links.forEach(processLink);
                    }
                });
            }
        });
    });

    // Запуск наблюдателя
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // Обработка ссылок после загрузки страницы
    processExistingLinks();
})();
