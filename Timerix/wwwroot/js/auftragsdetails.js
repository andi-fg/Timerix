var mitarbeiter;
var zeiterfassung
init();
function init() {
    mitarbeiter = initFooter("details");
}

function ausgabe() {
    var uri = "api/zeiterfassung/aktuelleZeiterfassung/" + mitarbeiter.mitarbeiterId;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            zeiterfassung = data;
            ausArbeitsorgang()
            ausAuftrag()
            ausLinie()
            dauer()
            document.getElementById("mid").innerHTML = mitarbeiter.name + " " + mitarbeiter.vorname;
        });
}

function ausArbeitsorgang() {
    var uri = "api/arbeitsvorgang/" + zeiterfassung.arbeitsvorgangId;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            document.getElementById("av").innerHTML = data.arbeitsvorgangName;
        });
}
function ausAuftrag() {
    var uri = "api/auftrag/" + zeiterfassung.auftragId;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            document.getElementById("aid").innerHTML = data.beschreibung;
        });
}
function ausLinie() {
    var uri = "api/produktionsstrasse/" + zeiterfassung.produktionsstrasseId;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            document.getElementById("pid").innerHTML = data.beschreibung;
        });
}
function dauer() {
    var uri = "api/zeiterfassung/zeitDauer/" + mitarbeiter.mitarbeiterId;
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            document.getElementById("dauer").innerHTML = data;
            window.setTimeout("dauer()", 1000);
        });
}
function auftragBeenden() {
    var uri = "api/zeiterfassung/endZeiterfassung";
    fetch(uri, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(zeiterfassung)
    })
        .then(response => {
            if (response.status == 400) {
                throw new Error("HTTP status " + response.status);
            } else {
                window.location = "menu.html";
                
            }
        })

        .catch(error => {
            alert("Zeiterfassung wurde nicht beendet");
            console.error('Zeiterfassung wurde nicht beendet', error)
        });
}

function vorgangWechseln() {
    window.location = "vorgangWechseln.html"
}