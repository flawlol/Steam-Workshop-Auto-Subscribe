class TestHandler {
    runTest(subscribeAll: HTMLButtonElement, unsubscribeAll: HTMLButtonElement) {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const tab = tabs[0];
            if (!tab) return;

            chrome.tabs.executeScript(tab.id, {
                code: `
                (() => {
                    const accountDropdown = document.getElementById('account_dropdown');
                    if (!accountDropdown) return false;
                    const buttons = Array.from(document.querySelectorAll('.subscriptionControls a'));
                    return buttons.length > 1;
                })();
                `
            }, (results) => {
                if (results && results[0]) {
                    chrome.storage.local.set({ isTested: true });
                    subscribeAll.disabled = false;
                    unsubscribeAll.disabled = false;
                    alert("✅ Test successful! You can use the extension.");
                } else {
                    chrome.storage.local.set({ isTested: false });
                    subscribeAll.disabled = true;
                    unsubscribeAll.disabled = true;
                    alert("❌ Test failed. Please log in and open a page with multiple items.");
                }
            });
        });
    }
}

const testHandler = new TestHandler();
export { testHandler };