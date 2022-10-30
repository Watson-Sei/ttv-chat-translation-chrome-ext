const twitch = "https://www.twitch.tv";
let auth_key = ""

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
            chrome.storage.local.get("auth_key", (items) => {
                auth_key = items.auth_key;
            })
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
    if (request.type == "translate") {
        fetch(`https://api-free.deepl.com/v2/translate`, {
            method: "POST",
            headers: {
                "Authorization": `DeepL-Auth-Key ${auth_key}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `text=${encodeURI(request.translate_base)}&target_lang=JA`
        })
        .then((res) => res.json())
        .then((data) => {
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
    } 
    if (request.type == "switch") {
        chrome.action.getBadgeText({tabId: sender.tab.id})
            .then((result) => {
                sendResponse({result: result})
            });
    }
    return true
})