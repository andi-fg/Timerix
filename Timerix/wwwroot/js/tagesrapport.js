﻿var mitarbeiter;
init();
function init() {
    document.getElementById('datePicker').valueAsDate = new Date()
    mitarbeiter =  initFooter("rapport");
    
    //getRapport();
}

function getRapport() {
    var d = document.getElementById('datePicker').valueAsDate;
    var datum = JSON.stringify(d);
    var rep = datum.replace(/["']/g, "")
    var uri = "https://localhost:44339/api/tagesrapport/datum/" + mitarbeiter.standortId+ "?datum=" + rep;
    //alert(uri);
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            dataArray = data;
            anzahlSeiten()
            getData(start, 4);
            // machTabelle(data);
           
        });
}

/*function machTabelle(data) {
   // alert(JSON.stringify(data[1]))
    var body = document.getElementById("tabelle");
    body.innerHTML = "";
    var counter = 1;
    data.forEach(item => {
        var tr = document.createElement("tr");
        tr.value = item;
        tr.setAttribute("id", counter);
        //Auftag
        var tdAuftrag = document.createElement("td");
        var auftrag = document.createTextNode(item.auftrag.beschreibung);
        tdAuftrag.appendChild(auftrag);
        tr.appendChild(tdAuftrag);
        //Auftragnummer
        var tdAuftragId = document.createElement("td");
        var auftragId = document.createTextNode(item.auftrag.auftragId);
        tdAuftragId.appendChild(auftragId);
        tr.appendChild(tdAuftragId);
        //Produktonsstrasse
        var tdLinie = document.createElement("td");
        var linie = document.createTextNode(item.produktionsstrasse.beschreibung);
        tdLinie.appendChild(linie);
        tr.appendChild(tdLinie);
        //Anzahl
        var tdAnzahl = document.createElement("td");
        var inputAnzahl = document.createElement("input");
        inputAnzahl.type = "number";
        inputAnzahl.value = item.anzahl;
        inputAnzahl.setAttribute("class", "form-control");
        var funktioAnzahl = "upAnzahl(" + counter + ")"
        inputAnzahl.setAttribute("onchange", funktioAnzahl);
        inputAnzahl.setAttribute("id", "anzahl" + counter);
        tdAnzahl.appendChild(inputAnzahl);
        tr.appendChild(tdAnzahl);
        //Bemerkung
        var tdBemerkung = document.createElement("td");
        var bemerkung = document.createElement("textarea");
        bemerkung.setAttribute("class", "form-control");
        var funktioBemerkung = "upBemerkung(" + counter + ")"
        bemerkung.setAttribute("onchange", funktioBemerkung);
        bemerkung.setAttribute("id", "bemerkung" + counter);
        bemerkung.value = item.bemerkung;
        tdBemerkung.appendChild(bemerkung);
        tr.appendChild(tdBemerkung);


        body.appendChild(tr);
        counter++;
    })
}*/
function upAnzahl(i) {
    var rapport = document.getElementById(i).value;
    var anzahl = document.getElementById("anzahl" + i).value;
    rapport.anzahl = anzahl;
    //alert(JSON.stringify(rapport))
    updateTagesrapport(rapport)
}

function upBemerkung(i) {
    var rapport = document.getElementById(i).value;
    var bemerkung = document.getElementById("bemerkung" + i).value;
    rapport.bemerkung = bemerkung;
    //alert(JSON.stringify(rapport))
    updateTagesrapport(rapport)
}
function updateTagesrapport(rapport) {
    document.getElementById("error").innerHTML = ""
    var uri = "api/tagesrapport/" + rapport.auftragId;
    fetch(uri, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rapport)
    })
        .then(response => {
            if (response.status == 400) {
                throw new Error("HTTP status " + response.status);
            } else {
              

            }
        })

        .catch(error => {
            document.getElementById("error").innerHTML = "Fehler bei der Eingabe der Anzahl"
            console.error('Zeiterfassung wurde nicht geändert', error)
        });
}
function anzahlSeiten() {
    start = 0;
    var s = Math.floor(dataArray.length / 4);
    if (dataArray.length % 4 == 0) {
        document.getElementById("seitenAnzahl").innerHTML = s;
    } else {
        document.getElementById("seitenAnzahl").innerHTML = s + 1;
    }
    
}
//Tabelle erstellen
var start = 0;
var dataArray;
function next() {
    start = start + 1;
    if ((start * 4) >= dataArray.length) {
        start = start - 1;
    }
    else {
        getData(start, 4);
    }
}
function privious() {
    start = start - 1;
    if (start < 0) {
        start = start + 1
    }
    else {
        getData(start, 4);
    }
}

async function getData(pageIndex, resultsPerPage) {

    var offset = pageIndex * resultsPerPage;//page 2=8, page 3=16;
    var limit = offset + resultsPerPage;
    document.getElementById("seite").innerHTML = pageIndex + 1
    var body = document.getElementById("tabelle");
    body.innerHTML = "";
    //loop through data
    for (var i = offset; (i < limit) && (i < dataArray.length); i++) {
       // alert(JSON.stringify(dataArray[i]))
        var tr = document.createElement("tr");
        tr.value = dataArray[i];
        tr.setAttribute("id", i);
        //Auftag
        var tdAuftrag = document.createElement("td");
        var auftrag = document.createTextNode(dataArray[i].auftrag.beschreibung);
        tdAuftrag.appendChild(auftrag);
        tr.appendChild(tdAuftrag);
        //Auftragnummer
        var tdAuftragId = document.createElement("td");
        var auftragId = document.createTextNode(dataArray[i].auftrag.auftragId);
        tdAuftragId.appendChild(auftragId);
        tr.appendChild(tdAuftragId);
        //Produktonsstrasse
        var tdLinie = document.createElement("td");
        var linie = document.createTextNode(dataArray[i].produktionsstrasse.beschreibung);
        tdLinie.appendChild(linie);
        tr.appendChild(tdLinie);
        //Zeit 
        var z = await dauer(dataArray[i])
        var tdZeit = document.createElement("td");
        var zeit = document.createTextNode(z);
        tdZeit.appendChild(zeit);
        tr.appendChild(tdZeit);
        //Anzahl
        var tdAnzahl = document.createElement("td");
        var inputAnzahl = document.createElement("input");
        inputAnzahl.type = "number";
        inputAnzahl.value = dataArray[i].anzahl;
        inputAnzahl.setAttribute("class", "form-control");
        var funktioAnzahl = "upAnzahl(" + i + ")"
        inputAnzahl.setAttribute("onchange", funktioAnzahl);
        inputAnzahl.setAttribute("id", "anzahl" + i);
        tdAnzahl.appendChild(inputAnzahl);
        tr.appendChild(tdAnzahl);
        //Bemerkung
        var tdBemerkung = document.createElement("td");
        var bemerkung = document.createElement("textarea");
        bemerkung.setAttribute("class", "form-control");
        var funktioBemerkung = "upBemerkung(" + i + ")"
        bemerkung.setAttribute("onchange", funktioBemerkung);
        bemerkung.setAttribute("id", "bemerkung" + i);
        bemerkung.value = dataArray[i].bemerkung;
        tdBemerkung.appendChild(bemerkung);
        tr.appendChild(tdBemerkung);

        body.appendChild(tr);
       // counter++;
    }
}

async function dauer(o) {
    var response = await fetch("api/tagesrapport/zeitDauer", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(o)
    })
    return await response.json();
}

