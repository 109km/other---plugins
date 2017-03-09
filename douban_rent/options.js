// Saves options to chrome.storage.sync.
function save_options() {
    var keywords = document.getElementById('new_keywords').value;
    chrome.storage.sync.set({
        keywords: keywords
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    console.log(chrome);
    chrome.storage.sync.get({
        keywords:"东城 10号 东四十条"
    }, function(items) {
        alert(items.keywords);
        document.getElementById('used_keywords').textContent = items.keywords;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);
