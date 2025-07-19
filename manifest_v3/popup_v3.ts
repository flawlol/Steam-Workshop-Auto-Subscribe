document.addEventListener("DOMContentLoaded", () => {
    const subscribe = "subscribe";
    const unsubscribe = "unsubscribe";
    const steamToggledClass = "toggled";
    const subscribeAll = document.getElementById("subscribeAll");
    const unsubscribeAll = document.getElementById("unsubscribeAll");

    if (!subscribeAll || !unsubscribeAll) {
        console.error("Buttons not found in the popup.");
        return;
    }

    subscribeAll.addEventListener("click", () => {
        handleAction(subscribe);
    });

    unsubscribeAll.addEventListener("click", () => {
        handleAction(unsubscribe);
    });

    function handleAction(action: 'subscribe' | 'unsubscribe') {
        const debugCheckbox = document.getElementById("debugMode") as HTMLInputElement | null;
        const debug = debugCheckbox?.checked ?? false;

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (!tab?.id) {
                console.error("No active tab found.");
                return;
            }

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (action: 'subscribe' | 'unsubscribe', debug: boolean, steamToggledClass: string) => {
                    const buttons = Array.from(document.querySelectorAll('.subscriptionControls a'));
                    let count = 0;

                    function processNext(index: number) {
                        if (index >= buttons.length || (debug && count >= 10)) {
                            alert((action === "subscribe" ? "Feliratkozva" : "Leiratkozva") + " " + count + " elemre.");
                            return;
                        }

                        const btn = buttons[index] as HTMLElement;
                        const isSubscribed = btn.classList.contains(steamToggledClass);

                        if ((action === 'subscribe' && isSubscribed) ||
                            (action === 'unsubscribe' && !isSubscribed)) {
                            processNext(index + 1);
                            return;
                        }

                        btn.click();
                        count++;

                        setTimeout(() => processNext(index + 1), 150);
                    }

                    processNext(0);
                },
                args: [action, debug, steamToggledClass]
            }).then(() => {
                console.log("Script executed.");
            }).catch(err => {
                console.error("Script execution failed:", err);
            });
        });
    }
});
