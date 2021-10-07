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
            machTabelle(data)
        });
}

function machTabelle(data) {
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
}

function getZeit(date) {
    var tag = ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate()))
    var monat = ((date.getMonth().toString().length + 1> 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)));
    var jahr = date.getFullYear();
    var stunden = ((date.getHours().toString().length > 1) ? date.getHours() : ('0' + date.getHours()));
    var minuten = ((date.getMinutes().toString().length > 1) ? date.getMinutes() : ('0' + date.getMinutes()));
    var sekunden = ((date.getSeconds().toString().length > 1) ? date.getSeconds() : ('0' + date.getSeconds()));
    return tag + "/" + monat + "/" + jahr + " " + stunden + ":" + minuten + ":" + sekunden;
}
function getDauer(date) {
    var stunden = ((date.getHours().toString().length> 1) ? date.getHours() : ('0' + date.getHours())) -1 ;
    var minuten = ((date.getMinutes().toString().length > 1) ? date.getMinutes() : ('0' + date.getMinutes()));
    return  stunden + ":" + minuten;
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