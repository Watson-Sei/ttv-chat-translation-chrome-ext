(async () => {
    await Promise.all([...document.querySelectorAll(".text-fragment")].map(async (element) => {
        const translate_base = element.outerHTML.slice(62).replace("</span>", "");
        translate_base.indexOf("=>JP") != -1 ?
            console.log("skip translate") :
            detail = await DealWithDeepl(translate_base);
            element.innerHTML = `<span class="text-fragment" data-a-target="chat-message-text"> ${detail.detected_source_language}=>JP ${detail.text}</span>`
        return
    }))
}).call()

function DealWithDeepl(translate_base) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(translate_base, (response) => {
            if (response.status === 0) {
                resolve(response.detail)
            } else {
                reject({})
            }
        })
    })
}
