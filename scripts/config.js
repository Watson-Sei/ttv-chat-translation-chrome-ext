function Save() {
    let auth_key = document.getElementById('input_auth_key').value;

    chrome.storage.local.set({"auth_key": auth_key}, () => {
    })
}

function Load() {
    chrome.storage.local.get("auth_key", (items) => {
        document.getElementById("input_auth_key").value = items.auth_key;
    })
}

document.addEventListener("DOMContentLoaded", Load);

document.getElementById("save_button").addEventListener("click", Save);