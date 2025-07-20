import { ActionTypes } from "../types/ActionTypes";

class ActionHandler {
    handle(action: ActionTypes, steamToggledClass: string, debug: boolean) {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const tab = tabs[0];
            if (!tab) return;

            chrome.tabs.executeScript(tab.id, {
                code: `
                (() => {
                    const steamToggledClass = "${steamToggledClass}";
                    const action = "${action}";
                    const debug = ${debug};

                    const buttons = Array.from(document.querySelectorAll('.subscriptionControls a'));
                    let count = 0;

                    function processNext(index) {
                        if (index >= buttons.length || (debug && count >= 10)) {
                            alert((action === "subscribe" ? "Subscribed" : "Unsubscribed") + " " + count + " items.");
                            return;
                        }

                        const btn = buttons[index];
                        const isSubscribed = btn.classList.contains(steamToggledClass);

                        if ((action === 'subscribe' && isSubscribed) ||
                            (action === 'unsubscribe' && !isSubscribed)) {
                            processNext(index + 1);
                            return;
                        }

                        btn.click();
                        ++count;

                        setTimeout(() => processNext(index + 1), 150);
                    }

                    processNext(0);
                })();
                `
            });
        });
    }
}

const actionHandler = new ActionHandler();
export { actionHandler };