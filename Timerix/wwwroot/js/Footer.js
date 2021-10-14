var mitarbeiter;
function initFooter(seite) {
    var uriMitStan = "session/mitStandort";
    fetch(uriMitStan)
        .then(response => response.text())
        .then(data => {
            if (data.length > 3) {
                mitarbeiter = JSON.parse(data);
                schreibFooter();
                admin();
                if (seite == "menu") {
                    laufenderAuftrag();
                    fetchStandort();
                } else if (seite == "abestaet") {
                    document.getElementById("mid").innerHTML = mitarbeiter.name + " " + mitarbeiter.vorname;
                }
                else if (seite == "details") {
                    ausgabe();
                } else if (seite == "vorgangWechseln") {
                    ausgabe();
                } else if (seite == "auswahlZeiterfassung") {
                    tabelle();
                } else if (seite == "zeitBearbeiten") {
                    initFelder();
                } else if (seite == "auswertung") {
                    initProdSelect();
                }
                else if (seite == "ausGesamt") {
                    ausTabelle();
                }
                return mitarbeiter;
            } else {
                footerMenu(seite);
            }
        });
}
function footerMenu(seite) {
    var uri = "session/mitId";
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            var uriMit = "api/mitarbeiter/mitstan/" + data;

            fetch(uriMit)
                .then(response => response.json())
                .then(dataMit => {
                    mitarbeiter = dataMit;
                    schreibFooter();
                    admin();
                    if (seite == "menu") {
                        fetchStandort();
                        laufenderAuftrag();
                    }
                    fetchMitStan();
                    return mitarbeiter;
                });
        });
}

function schreibFooter() {
    if (mitarbeiter.standortId != null) {
        document.getElementById("mitDaten").innerHTML = mitarbeiter.name + " " + mitarbeiter.vorname + " / MNr: " + mitarbeiter.mitarbeiterId + " / Standort: " + mitarbeiter.bezeichnung;
    } else {
        document.getElementById("mitDaten").innerHTML = mitarbeiter.name + " " + mitarbeiter.vorname + " / MNr: " + mitarbeiter.mitarbeiterId + " / Standort: ";
    }
}

function admin() {
    if (mitarbeiter.admin) {
        document.getElementById("mitButton").removeAttribute("hidden");
        document.getElementById("tagesrapport").removeAttribute("hidden");
        document.getElementById("import").removeAttribute("hidden");
    }
}

function fetchMitStan() {
    var uri = "session/mitStandort";
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mitarbeiter)
    })
        .then(response => {
        })

        .catch(error => console.error('Unable to add user.', error));
}

function ZeitAnzeigen() {
    var Wochentagname = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch",
        "Donnerstag", "Freitag", "Samstag");
    var Jetzt = new Date();
    var Tag = Jetzt.getDate();
    var Monat = Jetzt.getMonth() + 1;
    var Jahr = Jetzt.getYear();
    if (Jahr < 999)
        Jahr += 1900;
    var Stunden = Jetzt.getHours();
    var Minuten = Jetzt.getMinutes();
    var Sekunden = Jetzt.getSeconds();
    var WoTag = Jetzt.getDay();
    var Vortag = (Tag < 10) ? "0" : "";
    var Vormon = (Monat < 10) ? ".0" : ".";
    var Vorstd = (Stunden < 10) ? "0" : "";
    var Vormin = (Minuten < 10) ? ":0" : ":";
    var Vorsek = (Sekunden < 10) ? ":0" : ":";
    var Datum = Vortag + Tag + Vormon + Monat + "." + Jahr;
    var Uhrzeit = Vorstd + Stunden + Vormin + Minuten + Vorsek + Sekunden;
    var Gesamt = Wochentagname[WoTag] + ", " + Datum + ", " + Uhrzeit;
    document.getElementById("zeit").innerHTML = Gesamt;
    window.setTimeout("ZeitAnzeigen()", 1000);
}
window.onload(ZeitAnzeigen());