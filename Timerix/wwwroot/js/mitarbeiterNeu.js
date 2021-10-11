var mitarbeiter;
init();
function init() {
    mitarbeiter = initFooter("");
}

function speichern() {
    var mid = document.getElementById("mid").value;
    var uri = "api/mitarbeiter/" + mid;
    fetch(uri)
        .then(response => {
            if (response.status == 404) {
                response.json()
            } else {
                //throw new Error("HTTP status " + response.status);
            }
        })
        .then(data => {
            mitarbeiterSpeichern()
        })
        .catch(error => {
            document.getElementById("error").innerHTML = "Mitarbeiternummer ist schon vergeben oder nicht alle Pflichtfelder ausgefühlt"
            console.error('Mitarbeiternummer ist schon vergeben', error)
        });
}
function mitarbeiterSpeichern() {
    var uri = "api/mitarbeiter";
    var mitarbeiterBea = {}
    //mitarbeiterBea.mitarbeiterId = document.getElementById("mid").value
    mitarbeiterBea.name = document.getElementById("name").value
    mitarbeiterBea.vorname = document.getElementById("vorname").value
    mitarbeiterBea.bereich = document.getElementById("bereich").value
    mitarbeiterBea.abteilung = document.getElementById("abt").value
    mitarbeiterBea.aktiv = document.getElementById("aktiv").checked
    var d = strToDate(document.getElementById("datum").value)
    d.setHours(d.getHours() + 2)
    mitarbeiterBea.geburtsdatum = d
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mitarbeiterBea)
    })
        .then(response => {
            if (response.status == 400) {
                throw new Error("HTTP status " + response.status);
            } else {
                window.location = "mitarbeiterUebersicht.html";

            }
        })

        .catch(error => {
            document.getElementById("error").innerHTML = "Fehler bei Zeitformat bei von: dd/mm/yyyy oder nicht alle Pflichtfelder ausgefühlt"
            console.error('Mitarberiter wurde nicht gespeichert', error)
        });
   // alert(JSON.stringify(mitarbeiterBea))
}
function strToDate(dtStr) {
    if (!dtStr) return null
    var dateParts = dtStr.split("/");

    // month is 0-based, that's why we need dataParts[1] - 1
    return dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
}