function logout() {
    var uri = "session/reset"
    fetch(uri)
        .then(response => {
            window.location = "home.html";
        });
}
function neuerAuftragWechsel() {
    window.location = "neuerAuftrag.html";

}
function zurueck(id) {
    if (id == 1) {
        window.location = "menu.html";
    } else if (id == 2) {
        window.location = "neuerAuftrag.html";
    } else if (id == 3) {
        window.location = "menu.html";
    }
    else if (id == 4) {
        window.location = "auftragsdetails.html";
    } else if (id == 5) {
        window.location = "auswahlZeiterfassung.html";
    } else if (id == 6) {
        window.location = "mitarbeiterUebersicht.html";
    }
    else if (id == 7) {
        window.location = "auswertung.html";
    }
}
function auftragsdetails() {
    window.location = "auftragsdetails.html";
}
function auswahlZeiterfassung() {
    window.location = "auswahlZeiterfassung.html";
}
function mitarbeiterUeber() {
    window.location = "mitarbeiterUebersicht.html";
}

function showTagesrapport() {
    window.location = "tagesrapport.html";
}
function showAuswertung() {
    window.location = "auswertung.html";
}