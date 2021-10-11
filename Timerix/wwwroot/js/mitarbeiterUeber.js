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
            machTabelle(data)
        });
}
function machTabelle(data) {
    var body = document.getElementById("tabelle");
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
}
function mitBearbeiten(mid) {
    var uri = "session/mitBearbeitenId/" + mid
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            window.location = "mitarbeiterBearbeiten.html"
        });
    //window.location
}
function getZeit(date) {
    var tag = ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate()))
    var monat = (((date.getMonth() + 1).toString().length  > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)));
    var jahr = date.getFullYear();
   
    return tag + "/" + monat + "/" + jahr;
}
function mitarbeiterNeu() {
    window.location = "mitarbeiterNeu.html"
}