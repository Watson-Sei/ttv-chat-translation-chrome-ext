const twitch = "https://www.twitch.tv";
const auth_key = ""

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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    fetch(`https://api-free.deepl.com/v2/translate?text=${encodeURI(request)}&target_lang=JA`, {
        method: "POST",
        headers: {
            "Authorization": `DeepL-Auth-Key ${auth_key}`,
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data.translations[0])
        sendResponse({
            status: 0,
            detail: data.translations[0]
        })
    })
    .catch((err) => {
        sendResponse({
            status: 1
        })
    })
    return true
})