function setMitId(mid) {
    var uri = "session/mitId/" + mid;
    fetch(uri)
        .then(response => {
           window.location = "menu.html";
        });
}

function isMitId() {
    var uri = "session/mitId";
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            if (data == 0) {
                window.location = "home.html";
            }
        });
}

function resetMitarbeiter() {
    resetSession();
    var uri = "session/mitId/" + 0;
    fetch(uri)
        .then(response => {
           
        });
}
function resetSession() {
    var uri = "session/reset"
    fetch(uri)
        .then(response => {

        });
}

function getMitarbeiter() {
    var uri = "session/mitId";
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            var uriMit = "api/mitarbeiter/" + data;
            alert(uriMit);
            fetch(uriMit)
                .then(response => response.text())
                .then(dataMit => {
                    return dataMit;
                });
        });
}