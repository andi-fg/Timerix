var mitarbeiter;
var infos;
init();
function init() {
    mitarbeiter = initFooter("abestaet");
    ausgabe();
}

function ausgabe() {
    var uri = "session/zeiterfassungDaten";
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            infos = JSON.parse(data);
            document.getElementById("aid").innerHTML = infos.dataAuftrag.beschreibung;
            document.getElementById("pid").innerHTML = infos.dataProd.beschreibung;
            document.getElementById("av").innerHTML = infos.aVorgang.arbeitsvorgangName;
        });
}

function zeitErfassen() {
    var auftrag = infos.dataAuftrag;
    var linie = infos.dataProd;
    var vorgang = infos.aVorgang;
    var zeiterfassung = {
        auftrag: auftrag,
        produktionsstrasse: linie,
        arbeitsvorgang: vorgang
    }
    var uriMitarbeiter = "api/mitarbeiter/" + mitarbeiter.mitarbeiterId;
    fetch(uriMitarbeiter)
        .then(response => response.json())
        .then(data => {
            zeiterfassung.mitarbeiter = data;
            addZeiterfassung(zeiterfassung);
        });
}

function addZeiterfassung(data) {
    var uri = "api/zeiterfassung/addZeiterfassung";
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status == 400) {
                throw new Error("HTTP status " + response.status);
            } else {
                window.location = "auftragsdetails.html";
                
            }
        })

        .catch(error => {
            alert("Zeiterfassung wurde nicht gespeichert");
            console.error('Zeiterfassung wurde nicht gespeichert', error)
        });
}