// ==UserScript==
// @name         YouTube Watch to Embed Redirect (New Window)
// @namespace    http://your-namespace.com
// @version      0.5
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

    // Добавление метки к обработанным ссылкам
    const LINK_PROCESSED_ATTR = 'data-yt-redirect-processed';

    // Функция для обработки одной ссылки
    function processLink(link) {
        // Проверяем, что это ссылка на видео, и она ещё не обработана
        if (!link.href.includes('/watch') || link.hasAttribute(LINK_PROCESSED_ATTR)) {
            return;
        }

        // Добавляем атрибут, чтобы не обрабатывать ссылку повторно
        link.setAttribute(LINK_PROCESSED_ATTR, 'true');

        // Отмена стандартного поведения и открытие в новой вкладке
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное действие
            const videoIdMatch = link.href.match(/v=([a-zA-Z0-9_-]+)/);
            if (videoIdMatch && videoIdMatch[1]) {
                const videoId = videoIdMatch[1];
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                GM_openInTab(embedUrl, { active: true }); // Открыть в новой вкладке
            }
        });
    }

    // Функция для обработки всех существующих ссылок
    function processExistingLinks() {
        const links = document.querySelectorAll('a[href*="/watch"]:not([data-yt-redirect-processed])');
        links.forEach(processLink);
    }

    // Отслеживание новых ссылок через MutationObserver
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Проверяем, что это элемент
                        const links = node.querySelectorAll('a[href*="/watch"]:not([data-yt-redirect-processed])');
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
