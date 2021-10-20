var mitarbeiter;
init();
function init() {
    mitarbeiter = initFooter("auswahlZeiterfassung");
}
function tabelle() {
    var uri = "api/zeiterfassung/zeiterfassungenMit/" + mitarbeiter.mitarbeiterId;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            dataArray = data;
            anzahlSeiten()
            getData(start, 8);
            //machTabelle(data)
        });
}

/*function machTabelle(data) {
    var body = document.getElementById("tabelle");
    data.forEach(item => {
        var tr = document.createElement("tr");
        var funktio = "zeiterfassungBearbeiten(" + item.zeiterfassungId + ")"
        tr.setAttribute("onclick", funktio);
        var tdAuftrag = document.createElement("td");
        var auftrag = document.createTextNode(item.auftrag.auftragId);
        tdAuftrag.appendChild(auftrag);
        tr.appendChild(tdAuftrag);
        var date = new Date(item.zeitVon);
        var tdVon = document.createElement("td");
        var von = document.createTextNode(getZeit(date));
        tdVon.appendChild(von);
        tr.appendChild(tdVon);
        var dateBis = new Date(item.zeitBis);
        var tdBis = document.createElement("td");
        var bis;
        if (dateBis < date) {
            bis = document.createTextNode("");
        } else {
            bis = document.createTextNode(getZeit(dateBis));
        }
        
        tdBis.appendChild(bis);
        tr.appendChild(tdBis);
        var tdBesch = document.createElement("td");
        var besch = document.createTextNode(item.auftrag.beschreibung);
        tdBesch.appendChild(besch);
        tr.appendChild(tdBesch);
        var tdArbeits = document.createElement("td");
        var arbeits = document.createTextNode(item.arbeitsvorgang.arbeitsvorgangName);
        tdArbeits.appendChild(arbeits);
        tr.appendChild(tdArbeits);
        var tdDauer = document.createElement("td");
        var dauer ;
        if (dateBis < date) {
            var jetzt = new Date();
            dauer = document.createTextNode(getDauer(new Date(jetzt - date)));
        } else {
            dauer = document.createTextNode(getDauer(new Date(dateBis - date)));
        }
        tdDauer.appendChild(dauer);
        tr.appendChild(tdDauer);
        body.appendChild(tr);
    })
}*/
//Zeit anzeieg
function getZeit(date) {
    var tag = ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate()))
    var monat = (((date.getMonth()+1).toString().length > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)));
    var jahr = date.getFullYear();
    var stunden = ((date.getHours().toString().length > 1) ? date.getHours() : ('0' + date.getHours()));
    var minuten = ((date.getMinutes().toString().length > 1) ? date.getMinutes() : ('0' + date.getMinutes()));
    var sekunden = ((date.getSeconds().toString().length > 1) ? date.getSeconds() : ('0' + date.getSeconds()));
    return tag + "/" + monat + "/" + jahr + " " + stunden + ":" + minuten + ":" + sekunden;
}
//Dauer anzeige
function getDauer(date) {
    var jahr = date.getFullYear() - 1970;
    var monat = date.getMonth() + jahr*12;
    var tag = date.getDate() - 1 + monat * 30;
    var stunden;
    if (tag >= 1) {
       
        stunden = date.getHours()-1 + 24 * tag;
    } else {
        stunden = ((date.getHours().toString().length > 1) ? date.getHours() : ('0' + date.getHours())) - 1;
    }
    var minuten = ((date.getMinutes().toString().length > 1) ? date.getMinutes() : ('0' + date.getMinutes()));
    return stunden + ":" + minuten;
}

function zeiterfassungBearbeiten(zid) {
    var uri = "session/zeitId/" + zid;
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            window.location = "zeiterfassungBearbeiten.html";
        });
   // alert(zid);
}
function neueZeiterfassung() {
    window.location = "neueZeiterfassung.html"
}
function anzahlSeiten() {
    var s = Math.floor(dataArray.length / 8);
    if (dataArray.length % 8 == 0) {
        document.getElementById("seitenAnzahl").innerHTML = s;
    } else {
        document.getElementById("seitenAnzahl").innerHTML = s + 1;
    }
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
    document.getElementById("seite").innerHTML = pageIndex + 1
    var body = document.getElementById("tabelle");
    body.innerHTML = "";
    //loop through data
    for (var i = offset; i < limit; i++) {
        var tr = document.createElement("tr");
        var funktio = "zeiterfassungBearbeiten(" + dataArray[i].zeiterfassungId + ")"
        tr.setAttribute("onclick", funktio);
        var tdAuftrag = document.createElement("td");
        var auftrag = document.createTextNode(dataArray[i].auftrag.auftragId);
        tdAuftrag.appendChild(auftrag);
        tr.appendChild(tdAuftrag);
        var date = new Date(dataArray[i].zeitVon);
        var tdVon = document.createElement("td");
        var von = document.createTextNode(getZeit(date));
        tdVon.appendChild(von);
        tr.appendChild(tdVon);
        var dateBis = new Date(dataArray[i].zeitBis);
        var tdBis = document.createElement("td");
        var bis;
        if (dateBis < date) {
            bis = document.createTextNode("");
        } else {
            bis = document.createTextNode(getZeit(dateBis));
        }

        tdBis.appendChild(bis);
        tr.appendChild(tdBis);
        var tdBesch = document.createElement("td");
        var besch = document.createTextNode(dataArray[i].auftrag.beschreibung);
        tdBesch.appendChild(besch);
        tr.appendChild(tdBesch);
        var tdArbeits = document.createElement("td");
        var arbeits = document.createTextNode(dataArray[i].arbeitsvorgang.arbeitsvorgangName);
        tdArbeits.appendChild(arbeits);
        tr.appendChild(tdArbeits);
        var tdDauer = document.createElement("td");
        var dauer;
        if (dateBis < date) {
            var jetzt = new Date();
            dauer = document.createTextNode(getDauer(new Date(jetzt - date)));
        } else {
            dauer = document.createTextNode(getDauer(new Date(dateBis - date)));
        }
        tdDauer.appendChild(dauer);
        tr.appendChild(tdDauer);
        body.appendChild(tr);
    }
}