// Open the extension iframe when the extension button is clicked
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { method: "toggleExtension" });
    return true;
});
