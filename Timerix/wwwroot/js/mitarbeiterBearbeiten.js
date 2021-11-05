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
    fetchStandort();
   /* var uri = "api/standort/" + mit.standortId;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            if (data.standortId != null) {
                document.getElementById("mandant").value = data.dataareaid
            }
           
        });*/
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
    var sel = document.getElementById("standortSelect");
    var standort = null;
    data.forEach(item => {
        var opt = document.createElement("option");
        opt.value = item.dataareaid;
        opt.text = item.bezeichnung;
        sel.add(opt, null);
        if (mitarbeiterBea.standortId == item.standortId) {
            standort = item.dataareaid;
        }
    })
    if (mitarbeiter.standortId != null) {
        document.getElementById('standortSelect').value = standort;
    }
}
function getZeit(date) {
    var tag = ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate()))
    var monat = (((date.getMonth() + 1).toString().length > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)));
    var jahr = date.getFullYear();

    return tag + "/" + monat + "/" + jahr;
}

async function speichern() {
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
    var s = document.getElementById("standortSelect").value;
    var standort = await getStandort(s);
    if (standort.standortId == null && s.length > 0) {
        document.getElementById("error").innerHTML = "Mandant gibt es nicht"
    } else{
        mitarbeiterBea.standortId = standort.standortId
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
    }
    //alert(JSON.stringify(mitarbeiterBea))
}
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