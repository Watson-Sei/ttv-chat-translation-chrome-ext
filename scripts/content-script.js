window.addEventListener("load", (event) => {
    setInterval(() => {
        chrome.runtime.sendMessage({type: "switch"}, (response) => {
            if (response.result === "OFF") {
            } else if (response.result === "ON") {
                Promise.all([...document.querySelectorAll(".text-fragment")].map(async (element) => {
                    const translate_base = element.outerHTML.slice(62).replace("</span>", "");
                    if (translate_base.indexOf("=&gt;") != -1 || translate_base.length == 0) {
                    } else {
                        detail = await DealWithDeepl(translate_base)
                        element.innerHTML = `<span class="text-fragment" data-a-target="chat-message-text"> ${detail.detected_source_language}=>${detail.target_language} ${detail.text}</span>`
                    }
                    return
                }))
            }
        })
    }, 2000);
})

function DealWithDeepl(translate_base) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({type: "translate", translate_base: translate_base}, (response) => {
            if (response.status === 0) {
                resolve(response.detail)
            } else {
                reject({})
            }
        })
    })
}
