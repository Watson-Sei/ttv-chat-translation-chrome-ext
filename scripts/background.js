const twitch = "https://www.twitch.tv";

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(twitch)) {
        const prevState = await chrome.action.getBadgeText({tabId: tab.id});
        const nextState = prevState === "ON" ? "OFF" : "ON";

        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });

        if (nextState === "ON") {
            console.log("ON Translation");
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['scripts/content-script.js']
            })
        } else if (nextState === "OFF") {
            console.log("OFF Translation");
        }
    }
})