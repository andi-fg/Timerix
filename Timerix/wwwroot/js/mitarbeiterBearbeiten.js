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
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            ausgabe(data);
        });
}
var mitarbeiterBea;
function ausgabe(mit) {
    mitarbeiterBea = mit;
    document.getElementById("mid").innerHTML = mit.mitarbeiterId;
    document.getElementById("name").value = mit.name;
    document.getElementById("vorname").value = mit.vorname;
    document.getElementById("datum").value = getZeit(new Date(mit.geburtsdatum));
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
    var d = strToDate(document.getElementById("datum").value)
    mitarbeiterBea.geburtsdatum = d
    d.setHours(d.getHours() + 1)
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
            document.getElementById("error").innerHTML = "Fehler bei Zeitformat bei von: dd/mm/yyyy"
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