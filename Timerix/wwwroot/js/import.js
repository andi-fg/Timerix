var mitarbeiter;
init();
function init() {
    mitarbeiter = initFooter();
    fetchImporttabelle();
    
}
//Import der Aufträge
function importBut(){
    var uri = "api/import/import"
    fetch(uri)
        .then(response => {
            document.getElementById("ok").innerHTML = "Import durchgeführt"
            window.setTimeout("clear()", 10000);
        })
}
function clear() {
    document.getElementById("ok").innerHTML = ""
    
}
//Filter für die Tabellen
function filter() {
    start = 0
    var i = document.getElementById("filterID").value;
    var s = document.getElementById("filterBes").value;
    if (s == 1) {
        //Alle und zahl eingegeben
        var uri = "api/logimport/" + i
        fetch(uri)
            .then(response => response.json())
            .then(data => {
                dataArray = data;
                anzahlSeiten()
                getData(start, 8);
            });
    } else if (i.length == 0) {
        filterBeschreibung(s);
    } else {
        filterBeide(i,s);
    }
}
function filterBeschreibung(s) {
    //Keine Zahl input field leer
    var uri = "api/logimport/bes/" + s
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            dataArray = data;
            anzahlSeiten()
            getData(start, 8);
        });
}
function filterBeide(i, s) {
    //Beides etwas ausgewählt
    var uri = "api/logimport/beide/" + i + "/" + s;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            dataArray = data;
            anzahlSeiten()
            getData(start, 8);
        });
}
function fetchImporttabelle() {
    //Start tabelle mit allen Importlogs
    var uri = "api/logimport";
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            dataArray = data;
            anzahlSeiten()
            getData(start, 8);
        });
}
function anzahlSeiten() {
    var s = Math.floor(dataArray.length / 8);
    if (dataArray.length % 8 == 0) {
        document.getElementById("seitenAnzahl").innerHTML = s;
    } else {
        document.getElementById("seitenAnzahl").innerHTML = s + 1;
    }
}
//Tabellen funktion
var start = 0;
var dataArray;
function next() {
    start = start + 1;
    if ((start * 8) >= dataArray.length) {
        start = start - 1;
    }
    else {
        getData(start, 8);
    }
}
function privious() {
    start = start - 1;
    if (start < 0) {
        start = start + 1
    }
    else {
        getData(start, 8);
    }
}

function getData(pageIndex, resultsPerPage) {

    var offset = pageIndex * resultsPerPage;//page 2=8, page 3=16;
    var limit = offset + resultsPerPage;
    document.getElementById("seite").innerHTML = pageIndex + 1
    var body = document.getElementById("tabelle");
    body.innerHTML = "";
    //loop through data
    for (var i = offset; i < limit; i++) {
        var tr = document.createElement("tr");
        //AuftragId
        var tdId = document.createElement("td");
        var id = document.createTextNode(dataArray[i].auftragNummer);
        tdId.appendChild(id);
        tr.appendChild(tdId);
        //Auftrag name
        var tdName = document.createElement("td");
        var name = document.createTextNode(dataArray[i].auftrag);
        tdName.appendChild(name);
        tr.appendChild(tdName);
        //Resultat
        var tdVorname = document.createElement("td");
        var vorname = document.createTextNode(dataArray[i].beschreibung);
        tdVorname.appendChild(vorname)
        tr.appendChild(tdVorname);
        //Zeitpunkt
        var tdGeburt = document.createElement("td");
        var geburt = document.createTextNode(getZeit(new Date(dataArray[i].zeitpunkt)));
        tdGeburt.appendChild(geburt);
        tr.appendChild(tdGeburt);
        //Standort
        var tdAbt = document.createElement("td");
        var abt = document.createTextNode(dataArray[i].dataareaid);
        tdAbt.appendChild(abt);
        tr.appendChild(tdAbt);
        body.appendChild(tr);
    }
}
function getZeit(date) {
    var tag = ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate()))
    var monat = (((date.getMonth() + 1).toString().length > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)));
    var jahr = date.getFullYear();
    var stunden = ((date.getHours().toString().length > 1) ? date.getHours() : ('0' + date.getHours()));
    var minuten = ((date.getMinutes().toString().length > 1) ? date.getMinutes() : ('0' + date.getMinutes()));
    var sekunden = ((date.getSeconds().toString().length > 1) ? date.getSeconds() : ('0' + date.getSeconds()));
    return tag + "/" + monat + "/" + jahr + " " + stunden + ":" + minuten + ":" + sekunden;
}