var mitarbeiter;
init();
function init() {
    mitarbeiter = initFooter();
    getMitarbeiterSession()
}

function getMitarbeiterSession() {
    var uri = "session/mitBearbeitenId"
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            getMitarbeiter(data)
        });
}
function getMitarbeiter(mid) {
    var uri = "api/mitarbeiter/" + mid;
    //alert(uri);
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            ausgabe(data);
        });
}
var mitarbeiterBea;
function ausgabe(mit) {
    //alert(JSON.stringify(mit));
    mitarbeiterBea = mit;
    document.getElementById("mid").innerHTML = mit.mitarbeiterId;
    document.getElementById("name").value = mit.name;
    document.getElementById("vorname").value = mit.vorname;
    //document.getElementById("datum").value = getZeit(new Date(mit.geburtsdatum));
    var d = Date.parse(mit.geburtsdatum)
    d += 3600000*2;
    //alert(new Date(d))
    document.getElementById("datePicker").valueAsDate = new Date(d);
    document.getElementById("bereich").value = mit.bereich;
    document.getElementById("abt").value = mit.abteilung;
    document.getElementById("aktiv").checked = mit.aktiv;
}
function getZeit(date) {
    var tag = ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate()))
    var monat = (((date.getMonth() + 1).toString().length > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)));
    var jahr = date.getFullYear();

    return tag + "/" + monat + "/" + jahr;
}

function speichern() {
    var uri = "api/mitarbeiter/" + mitarbeiterBea.mitarbeiterId;
    mitarbeiterBea.name = document.getElementById("name").value
    mitarbeiterBea.vorname = document.getElementById("vorname").value
    mitarbeiterBea.bereich = document.getElementById("bereich").value
    mitarbeiterBea.abteilung = document.getElementById("abt").value
    mitarbeiterBea.aktiv = document.getElementById("aktiv").checked
    mitarbeiterBea.geburtsdatum = document.getElementById('datePicker').valueAsDate;
    //var d = strToDate(document.getElementById("datum").value)
    //d.setHours(d.getHours() + 1)
    //mitarbeiterBea.geburtsdatum = d
    
    fetch(uri, {
        method: 'PUT',
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
            console.error('Zeiterfassung wurde nicht geändert', error)
        });
    //alert(JSON.stringify(mitarbeiterBea))
}
function strToDate(dtStr) {
    if (!dtStr) return null
    var dateParts = dtStr.split("/");

    // month is 0-based, that's why we need dataParts[1] - 1
    return dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
}