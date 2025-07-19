import { testHandler } from "./handlers/TestHandler";
import { actionHandler } from "./handlers/ActionHandler";

document.addEventListener("DOMContentLoaded", () => {
   // chrome.storage.local.set({ isTested: false });
    const subscribe = "subscribe";
    const unsubscribe = "unsubscribe";
    const steamToggledClass = "toggled";
    const subscribeAll = document.getElementById("subscribeAll") as HTMLButtonElement | null;
    const unsubscribeAll = document.getElementById("unsubscribeAll") as HTMLButtonElement | null;
    const testButton = document.getElementById("testButton") as HTMLButtonElement | null;

    if (!subscribeAll || !unsubscribeAll || !testButton) {
        console.error("Buttons not found in the popup.");
        return;
    }

    chrome.storage.local.get("isTested", (data) => {
        const isTested = data.isTested ?? false;
        subscribeAll.disabled = !isTested;
        unsubscribeAll.disabled = !isTested;
    });

    subscribeAll.addEventListener("click", () => {
        const debugCheckbox = document.getElementById("debugMode") as HTMLInputElement | null;
        const debug = debugCheckbox?.checked ?? false;

        actionHandler.handle(subscribe, steamToggledClass, debug);
    });

    unsubscribeAll.addEventListener("click", () => {
        const debugCheckbox = document.getElementById("debugMode") as HTMLInputElement | null;
        const debug = debugCheckbox?.checked ?? false;

        actionHandler.handle(unsubscribe, steamToggledClass, debug);
    });

    testButton.addEventListener("click", () => {
        testHandler.runTest(subscribeAll, unsubscribeAll);
    });
});