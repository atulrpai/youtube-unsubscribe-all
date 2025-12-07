let unsubscribeButtons = [];
let unsubscribeIndex = 0;
let unsubscribeIntervalId = null;

function clickUnsubscribeSequence(button) {
    if (!button) return;

    button.click();

    setTimeout(() => {
        const menuItem = Array.from(document.querySelectorAll('ytd-menu-service-item-renderer tp-yt-paper-item')).find(el => el.innerText.trim() === "Unsubscribe");

        if (menuItem) {
            menuItem.click();
        }

        setTimeout(() => {
            const confirmBtn = document.querySelector('#confirm-button button');
            if (confirmBtn) {
                confirmBtn.click();
            }
        }, 150);

    }, 150);
}

function unsubscribeNext() {
    if (unsubscribeIndex < unsubscribeButtons.length) {
        clickUnsubscribeSequence(unsubscribeButtons[unsubscribeIndex]);
        unsubscribeIndex++;
    } else {
        clearInterval(unsubscribeIntervalId);
    }
}

async function unsubscribeAll() {
    unsubscribeButtons = Array.from(
        document.querySelectorAll(
            'ytd-subscription-notification-toggle-button-renderer-next button.yt-spec-button-shape-next'
        )
    );

    if (!unsubscribeButtons.length) {
        return;
    }

    unsubscribeIndex = 0;

    unsubscribeIntervalId = setInterval(unsubscribeNext, 500);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "unsubscribeAll" && window.location.href === "https://www.youtube.com/feed/channels") {
        unsubscribeAll();
    }
});
