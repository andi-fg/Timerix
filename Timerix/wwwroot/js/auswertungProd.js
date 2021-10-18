var mitarbeiter;
init();
function init() {
    mitarbeiter = initFooter();
    fetchProd()
}
function fetchProd() {
    var uri = "session/prodId"
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            var uriProd = "api/produktionsstrasse/" + data
            fetch(uriProd)
                .then(response => response.json())
                .then(dataProd => {
                    document.getElementById("prodStrasse").innerHTML = dataProd.beschreibung
                });
            initTabelle(data)
        });
}
function initTabelle(pid) {
    var uri = "api/auswertung/maschine/" + pid
    fetch(uri)
        .then(response => response.json())
        .then(dataProd => {
            dataArray = dataProd;
            getData(start, 8);
           // tabelleErstellen(dataProd)
        });
    
}
/*function tabelleErstellen(data) {
    var body = document.getElementById("tabelle");
    data.forEach(item => {
        //alert(JSON.stringify(item))
        var tr = document.createElement("tr");
        var tdId = document.createElement("td");
        var id = document.createTextNode(item.id);
        tdId.appendChild(id);
        tr.appendChild(tdId);
        var tdNr = document.createElement("td");
        var nr = document.createTextNode(item.mitarbeiterId)
        tdNr.appendChild(nr);
        tr.appendChild(tdNr);
        var tdName = document.createElement("td");
        var name = document.createTextNode(item.mitarbeiter);
        tdName.appendChild(name)
        tr.appendChild(tdName)
        var tdCh = document.createElement("td");
        var ch = document.createTextNode(item.chargenauftrag)
        tdCh.appendChild(ch)
        tr.appendChild(tdCh)
        var tdArbeit = document.createElement("td");
        var arbeit = document.createTextNode(item.arbeitsvorgang);
        tdArbeit.appendChild(arbeit)
        tr.appendChild(tdArbeit)
        var date = new Date(item.eingestempelt);
        var tdEin = document.createElement("td");
        var ein = document.createTextNode(getZeit(date));
        tdEin.appendChild(ein)
        tr.appendChild(tdEin)
        body.appendChild(tr);
    })
}
*/
function getZeit(date) {
    var tag = ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate()))
    var monat = (((date.getMonth() + 1).toString().length > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)));
    var jahr = date.getFullYear();
    var stunden = ((date.getHours().toString().length > 1) ? date.getHours() : ('0' + date.getHours()));
    var minuten = ((date.getMinutes().toString().length > 1) ? date.getMinutes() : ('0' + date.getMinutes()));
    var sekunden = ((date.getSeconds().toString().length > 1) ? date.getSeconds() : ('0' + date.getSeconds()));
    return tag + "/" + monat + "/" + jahr + " " + stunden + ":" + minuten + ":" + sekunden;
}

//Tabelle
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

    var body = document.getElementById("tabelle");
    body.innerHTML = "";
    //loop through data
    for (var i = offset; i < limit; i++) {
        var tr = document.createElement("tr");
        var tdId = document.createElement("td");
        var id = document.createTextNode(dataArray[i].id);
        tdId.appendChild(id);
        tr.appendChild(tdId);
        var tdNr = document.createElement("td");
        var nr = document.createTextNode(dataArray[i].mitarbeiterId)
        tdNr.appendChild(nr);
        tr.appendChild(tdNr);
        var tdName = document.createElement("td");
        var name = document.createTextNode(dataArray[i].mitarbeiter);
        tdName.appendChild(name)
        tr.appendChild(tdName)
        var tdCh = document.createElement("td");
        var ch = document.createTextNode(dataArray[i].chargenauftrag)
        tdCh.appendChild(ch)
        tr.appendChild(tdCh)
        var tdArbeit = document.createElement("td");
        var arbeit = document.createTextNode(dataArray[i].arbeitsvorgang);
        tdArbeit.appendChild(arbeit)
        tr.appendChild(tdArbeit)
        var date = new Date(dataArray[i].eingestempelt);
        var tdEin = document.createElement("td");
        var ein = document.createTextNode(getZeit(date));
        tdEin.appendChild(ein)
        tr.appendChild(tdEin)
        body.appendChild(tr);
    }
}