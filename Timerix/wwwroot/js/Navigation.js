﻿function logout() {
    var uri = "session/reset"
    fetch(uri)
        .then(response => {
            window.location = "home.html";
        });
}
function neuerAuftragWechsel(mitStan) {
    var uri = "session/mitStandort";
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mitStan)
    })
        .then(response => {
            window.location = "neuerAuftrag.html";
        })

        .catch(error => console.error('Unable to add user.', error));

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