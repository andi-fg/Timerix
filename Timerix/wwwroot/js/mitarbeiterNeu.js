var mitarbeiter;
init();
function init() {
    mitarbeiter = initFooter("");
    document.getElementById('datePicker').valueAsDate = new Date()
}

function speichern() {
    var mid = document.getElementById("mid").value;
    var uri = "api/mitarbeiter/" + mid;
    fetch(uri)
        .then(response => {
            if (response.status == 404) {
                response.json()
            } else {
                throw new Error("HTTP status " + response.status);
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
async function mitarbeiterSpeichern() {
    var uri = "api/mitarbeiter";
    var mitarbeiterBea = {}
    mitarbeiterBea.mitarbeiterId = document.getElementById("mid").value
    mitarbeiterBea.name = document.getElementById("name").value
    mitarbeiterBea.vorname = document.getElementById("vorname").value
    mitarbeiterBea.bereich = document.getElementById("bereich").value
    mitarbeiterBea.abteilung = document.getElementById("abt").value
    mitarbeiterBea.aktiv = document.getElementById("aktiv").checked
    //var d = strToDate(document.getElementById("datum").value)
    //d.setHours(d.getHours() + 2)
    // mitarbeiterBea.geburtsdatum = d
    mitarbeiterBea.geburtsdatum = document.getElementById('datePicker').valueAsDate;
    var s = document.getElementById("mandant").value;
    var standort = await getStandort(s);
    if (standort.standortId == null && s.length > 0) {
        document.getElementById("error").innerHTML = "Mandant gibt es nicht"
    } else {
        mitarbeiterBea.standortId = standort.standortId
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
                document.getElementById("error").innerHTML = "Alle Pflichtfelder müssen ausgefühlt werden"
                console.error('Mitarberiter wurde nicht gespeichert', error)
            });
    }
   //alert(JSON.stringify(mitarbeiterBea))
}
//Datum konventieren
function strToDate(dtStr) {
    if (!dtStr) return null
    var dateParts = dtStr.split("/");

    // month is 0-based, that's why we need dataParts[1] - 1
    return dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
}
async function getStandort(dataarea) {
    var response = await fetch("api/standort/dataarea?dataarea=" + dataarea)
    return await response.json();
}