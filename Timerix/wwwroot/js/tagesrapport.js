var mitarbeiter;
init();
function init() {
    mitarbeiter = initFooter();
    document.getElementById('datePicker').valueAsDate = new Date()
    getRapport();
}

function getRapport() {
    var d = document.getElementById('datePicker').valueAsDate;
    var datum = JSON.stringify(d);
    var rep = datum.replace(/["']/g, "")
    var uri = "https://localhost:44339/api/tagesrapport/datum?datum=" + rep;
    //alert(uri);
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            machTabelle(data);
        });
}

function machTabelle(data) {
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
}
function upAnzahl(i) {
    var rapport = document.getElementById(i).value;
    var anzahl = document.getElementById("anzahl" + i).value;
    rapport.anzahl = anzahl;
    alert(JSON.stringify(rapport))
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