var mitarbeiter;
init();
function init() {
    mitarbeiter = initFooter();
    fetchMitarbeiter();
}

function fetchMitarbeiter() {
    var uri = "api/mitarbeiter";
    fetch(uri)
        .then(response => response.json())
        .then(data => {
           // machTabelle(data)
            dataArray = data;
            getData(start, 8);
        });
}
//Tabelle erstellen
/*function machTabelle(data) {
    var body = document.getElementById("tabelle");
    body.innerHTML = "";
    data.forEach(item => {

        var tr = document.createElement("tr");
        var funktio = "mitBearbeiten(" + item.mitarbeiterId + ")"
        tr.setAttribute("onclick", funktio);
        var tdId = document.createElement("td");
        var id = document.createTextNode(item.mitarbeiterId);
        tdId.appendChild(id);
        tr.appendChild(tdId);
        var tdName = document.createElement("td");
        var name = document.createTextNode(item.name);
        tdName.appendChild(name);
        tr.appendChild(tdName);
        var tdVorname = document.createElement("td");
        var vorname = document.createTextNode(item.vorname);
        tdVorname.appendChild(vorname)
        tr.appendChild(tdVorname);
        var tdGeburt = document.createElement("td");
        var geburt = document.createTextNode(getZeit(new Date(item.geburtsdatum)));
        tdGeburt.appendChild(geburt);
        tr.appendChild(tdGeburt);
        var tdAbt = document.createElement("td");
        var abt = document.createTextNode(item.abteilung);
        tdAbt.appendChild(abt);
        tr.appendChild(tdAbt);
        body.appendChild(tr);
    })
}*/
function mitBearbeiten(mid) {
    var uri = "session/mitBearbeitenId/" + mid
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            window.location = "mitarbeiterBearbeiten.html"
        });
    //window.location
}
//Datum anzeige
function getZeit(date) {
    var tag = ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate()))
    var monat = (((date.getMonth() + 1).toString().length  > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)));
    var jahr = date.getFullYear();
   
    return tag + "/" + monat + "/" + jahr;
}
function mitarbeiterNeu() {
    window.location = "mitarbeiterNeu.html"
}
//Tabelle mit aktiv, innaktiv, oder alle Mitarbeiter machen
function wechsekAktiv() {
    var a = document.getElementById("aktiv").value;
    var uri = "api/mitarbeiter/aktiv/"+a
    if (a == 1) {
        fetchMitarbeiter();
    } else {
        fetch(uri)
            .then(response => response.json())
            .then(data => {
                //machTabelle(data)
               // alert(JSON.stringify(data))
                start = 0;
                dataArray = data;
                getData(start, 8);
            });
    }
}

var start = 0;
var dataArray;
function next() {
    start = start + 1;
    if ((start * 10) > dataArray.length) {
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

    var offset = pageIndex * resultsPerPage;//page 2=10, page 3=20;
    var limit = offset + resultsPerPage;

    var body = document.getElementById("tabelle");
    body.innerHTML = "";
    //loop through data
    for (var i = offset; i < limit; i++) {

        var tr = document.createElement("tr");
        var funktio = "mitBearbeiten(" + dataArray[i].mitarbeiterId + ")"
        tr.setAttribute("onclick", funktio);
        var tdId = document.createElement("td");
        var id = document.createTextNode(dataArray[i].mitarbeiterId);
        tdId.appendChild(id);
        tr.appendChild(tdId);
        var tdName = document.createElement("td");
        var name = document.createTextNode(dataArray[i].name);
        tdName.appendChild(name);
        tr.appendChild(tdName);
        var tdVorname = document.createElement("td");
        var vorname = document.createTextNode(dataArray[i].vorname);
        tdVorname.appendChild(vorname)
        tr.appendChild(tdVorname);
        var tdGeburt = document.createElement("td");
        var geburt = document.createTextNode(getZeit(new Date(dataArray[i].geburtsdatum)));
        tdGeburt.appendChild(geburt);
        tr.appendChild(tdGeburt);
        var tdAbt = document.createElement("td");
        var abt = document.createTextNode(dataArray[i].abteilung);
        tdAbt.appendChild(abt);
        tr.appendChild(tdAbt);
        body.appendChild(tr);
    }


}