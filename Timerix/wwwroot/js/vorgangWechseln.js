var mitarbeiter;
init();
function init() {
    mitarbeiter = initFooter("vorgangWechseln");
    fetchArbeitsvorgang();
}

function ausgabe() {
    var uri = "api/zeiterfassung/aktuelleZeiterfassung/" + mitarbeiter.mitarbeiterId;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            zeiterfassung = data;
            ausAuftrag()
            ausLinie()
            document.getElementById("mid").innerHTML = mitarbeiter.name + " " + mitarbeiter.vorname;
        });
}
var auftrag;
function ausAuftrag() {
    var uri = "api/auftrag/" + zeiterfassung.auftragId;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            auftrag = data;
            document.getElementById("aid").innerHTML = data.beschreibung;
        });
}
var linie;
function ausLinie() {
    var uri = "api/produktionsstrasse/" + zeiterfassung.produktionsstrasseId;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            linie = data;
            document.getElementById("pid").innerHTML = data.beschreibung;
        });
}
function fetchArbeitsvorgang() {
    var uri = "api/Arbeitsvorgang";
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            initSelectArbeitsvorgang(data);
        });
}

function initSelectArbeitsvorgang(data) {
    var sel = document.getElementById("arbeitsvorgangSelect");
    data.forEach(item => {
        var opt = document.createElement("option");
        opt.value = JSON.stringify(item);
        opt.text = item.arbeitsvorgangName;
        sel.add(opt, null);
    })
}

function zeitErfassen() {
    var vorgang = JSON.parse(document.getElementById("arbeitsvorgangSelect").value);
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
                alert("Zeiterfassung gespeichert");
            }
        })

        .catch(error => {
            alert("Zeiterfassung wurde nicht gespeichert");
            console.error('Zeiterfassung wurde nicht gespeichert', error)
        });
}

function abbrechen() {
    window.location = "auftragsdetails.html";
}