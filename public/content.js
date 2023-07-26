function messagesFromReactAppListener(msg, sender, sendResponse) {
    switch (msg.method) {
        case "getSelection": {
            let sel = document.getSelection();
            sendResponse(sel.toString());
            sel.removeAllRanges();
            break;
        }
        case "toggleExtension": {
            const extensionIframe =
                document.getElementById("project-nifty-root");
            if (extensionIframe.style.display === "none") {
                extensionIframe.style.display = "block";
            } else {
                extensionIframe.style.display = "none";
            }
            sendResponse(true);
            break;
        }
    }
    return true;
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
