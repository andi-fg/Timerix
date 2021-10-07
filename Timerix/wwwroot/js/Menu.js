﻿var mitarbeiter;
init();
function init() {
    mitarbeiter = initFooter("menu");
}

function fetchStandort() {
    var uri = "api/standort";
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            standortMenuSelect(data);
        });
}

function standortMenuSelect(data) {
    var sel = document.getElementById("standortMenuSelect");
    var standort = null;
    data.forEach(item => {
        var opt = document.createElement("option");
        opt.value = JSON.stringify(item);
        opt.text = item.bezeichnung;
        sel.add(opt, null);
        if (mitarbeiter.standortId == item.standortId) {
            standort = item;
        }
    })
    if (mitarbeiter.standortId != null) {
        document.getElementById('standortMenuSelect').value = JSON.stringify(standort);
    }
}

function setMitStand() {
    var stand = JSON.parse(document.getElementById('standortMenuSelect').value);
    mitarbeiter.bezeichnung = stand.bezeichnung;
    mitarbeiter.standortId = stand.standortId;
    mitarbeiter.auftragPraefix = stand.auftragPraefix;
    if (mitarbeiter.standortId != null) {
        document.getElementById("mitDaten").innerHTML = mitarbeiter.name + " " + mitarbeiter.vorname + " / MNr: " + mitarbeiter.mitarbeiterId + " / Standort: " + mitarbeiter.bezeichnung;
    } else {
        document.getElementById("mitDaten").innerHTML = mitarbeiter.name + " " + mitarbeiter.vorname + " / MNr: " + mitarbeiter.mitarbeiterId + " / Standort: ";
    }
}

function neuerAuftrag() {
    neuerAuftragWechsel(mitarbeiter);
}

function laufenderAuftrag() {
    var uri = "api/zeiterfassung/aktuelleZeiterfassung/" + mitarbeiter.mitarbeiterId;
    fetch(uri)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error("HTTP status " + response.status);
            }
        })
        .then(data => {
            ausArbeitsorgang(data)
            ausAuftrag(data)
            ausLinie(data)
            dauer()
            document.getElementById("card").setAttribute("onclick", "auftragsdetails()");
        })
        .catch(error => {
            console.error('Keine aktuelle Zeiterfassung', error)
        });
}

function ausArbeitsorgang(zeiterfassung) {
    var uri = "api/arbeitsvorgang/" + zeiterfassung.arbeitsvorgangId;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            document.getElementById("av").innerHTML = "Arbeitsvorgang: " + data.arbeitsvorgangName;
        });
}
function ausAuftrag(zeiterfassung) {
    var uri = "api/auftrag/" + zeiterfassung.auftragId;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            document.getElementById("aid").innerHTML = "Auftrag: " +data.beschreibung;
        });
}
function ausLinie(zeiterfassung) {
    var uri = "api/produktionsstrasse/" + zeiterfassung.produktionsstrasseId;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            document.getElementById("pid").innerHTML = "Linie: " +data.beschreibung;
        });
}
function dauer() {
    var uri = "api/zeiterfassung/zeitDauer/" + mitarbeiter.mitarbeiterId;
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            document.getElementById("dauer").innerHTML = "Dauer: " + data;
            window.setTimeout("dauer()", 1000);
        });
}
