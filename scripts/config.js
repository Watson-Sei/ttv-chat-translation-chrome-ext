function Save() {
    let auth_key = document.getElementById('input_auth_key').value;

    chrome.storage.local.set({"auth_key": auth_key}, () => {
    })

    console.log(document.getElementById("target_language").selectedIndex);
    chrome.storage.local.set({"target_language": document.getElementById("target_language").options[document.getElementById("target_language").selectedIndex].value});
}

function Load() {
    chrome.storage.local.get("auth_key", (items) => {
        document.getElementById("input_auth_key").value = items.auth_key;
    })

    chrome.storage.local.get("target_language", (items) => {
        for (let i = 0; i < document.getElementById("target_language").options.length; i++) {
            if (document.getElementById("target_language").options[i].value == items.target_language) {
                document.getElementById("target_language").options[i].selected = true;
            }
        }
    })
}

document.addEventListener("DOMContentLoaded", Load);

document.getElementById("save_button").addEventListener("click", Save);