let elements = document.querySelectorAll(".text-fragment");
for (const element of elements) {
    const translate_base = element.outerHTML.slice(62).replace("</span>", "");
    element.innerHTML = `<span class="text-fragment" data-a-target="chat-message-text">EN=>JP${translate_base}</span>`
}