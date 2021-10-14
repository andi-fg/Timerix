var mitarbeiter;
init();
function init() {
    mitarbeiter = initFooter("auswertung");
}

function initProdSelect() {
    var uri = "api/produktionsstrasse/standort/"
    if (mitarbeiter.standortId != null) {
        uri += mitarbeiter.standortId
    } else {
        uri += "0"
    }
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            prodSelect(data);
        });
}

function prodSelect(data) {
    var sel = document.getElementById("pid");
    data.forEach(item => {
        var opt = document.createElement("option");
        opt.value = item.produktionsstrasseId
        opt.text = item.beschreibung;
        sel.add(opt, null);
    })
}
function auswertungGesamt() {
    window.location = "auswertungGesamt.html";
}

function prodAuswertung() {
    var pid = document.getElementById("pid").value;
    var uri = "session/prodId/" + pid;
    fetch(uri)
        .then(response => {
            window.location = "auswertungProd.html"
        })
        
}
function auftragAuswertung() {
    var aid = document.getElementById("aid").value;
    var uri = "session/auftragId/" + mitarbeiter.auftragPraefix + aid;
    fetch(uri)
        .then(response => {
            window.location = "auswertungAuftrag.html"
        })
}