﻿var mitarbeiter;
var zid = 
init();
function init() {
    mitarbeiter = initFooter("zeitBearbeiten");
}
function initFelder() {
    var uri = "session/zeitId"
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            zid=data
            getZeiterfassung();
        });
}
function getZeiterfassung() {
    var uri = "api/zeiterfassung/zeiterfassungenBearbeiten/" + zid
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            ausgabe(data);
            //alert(JSON.stringify(data))
        });
}
function ausgabe(data) {
    document.getElementById("aid").value = data.auftrag.auftragId
    document.getElementById("pid").value = data.produktionsstrasse.produktionsstrasseId
    document.getElementById("von").value = getZeit(new Date(data.zeitVon))
    document.getElementById("bis").innerHTML = getZeit(new Date(data.zeitBis))
    fetchArbeitsvorgang();
}
function fetchArbeitsvorgang() {
    var uri = "api/Arbeitsvorgang";
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            initSelectArbeitsvorgang(data);
        });
}

function initSelectArbeitsvorgang(data) {
    var sel = document.getElementById("arbeitsvorgangSelect");
    data.forEach(item => {
        var opt = document.createElement("option");
        opt.value = JSON.stringify(item);
        opt.text = item.arbeitsvorgangName;
        sel.add(opt, null);
    })
}
function getZeit(date) {
    var tag = ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate()))
    var monat = ((date.getMonth().toString().length + 1 > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)));
    var jahr = date.getFullYear();
    var stunden = ((date.getHours().toString().length > 1) ? date.getHours() : ('0' + date.getHours()));
    var minuten = ((date.getMinutes().toString().length > 1) ? date.getMinutes() : ('0' + date.getMinutes()));
    var sekunden = ((date.getSeconds().toString().length > 1) ? date.getSeconds() : ('0' + date.getSeconds()));
    return tag + "/" + monat + "/" + jahr + " " + stunden + ":" + minuten + ":" + sekunden;
}

function speichern() {
    var pid = document.getElementById("pid").value;
    var aid = document.getElementById("aid").value;
    var aVorgang = JSON.parse(document.getElementById('arbeitsvorgangSelect').value);
    var uriProd = "api/produktionsstrasse/" + pid;
    var uriAuftrag = "api/auftrag/" + aid;
    fetch(uriProd)
        .then(response => {
            if (pid.length < 1) {
                throw new Error("HTTP status " + response.status);
            }
            else if (response.status == 200) {
                return response.json();
            } else {
                throw new Error("HTTP status " + response.status);
            }
        })
        .then(dataProd => {
            fetch(uriAuftrag)
                .then(response => {
                    if (aid.length < 1) {
                        throw new Error("HTTP status " + response.status);
                    }
                    else if (response.status == 200) {
                        return response.json();
                    }
                    else {
                        throw new Error("HTTP status " + response.status);
                    }
                })
                .then(dataAuftrag => {
                    var output = {
                        aVorgang,
                        dataProd,
                        dataAuftrag
                    };
                    updateZeiterfassung(output);
                })
                .catch(error => {
                    alert("Auftrag wurde nicht gefunden");
                    console.error('Auftrag wurde nicht gefunden.', error)
                });


        })
        .catch(error => {
            alert("Strasse wurde nicht gefunden");
            console.error('Strasse wurde nicht gefunden.', error)
        });
}
function updateZeiterfassung(output) {
    var uriZeit = "api/zeiterfassung/" + zid;
    fetch(uriZeit)
        .then(response => response.json())
        .then(data => {
            data.auftragId = output.dataAuftrag.auftragId
            data.auftrag = output.dataAuftrag;
            data.produktionsstrasseId = output.dataProd.produktionsstrasseId
            data.produktionsstrasse = output.dataProd;
            data.arbeitsvorgangId = output.aVorgang.arbeitsvorgangId;
            data.arbeitsvorgang = output.aVorgang;
            var d = document.getElementById("von").value;
            try {
                var datumVon = strToDate(d);
                datumVon.setHours(datumVon.getHours() + 2);
                data.zeitVon = datumVon;
                if (datumVon > new Date(data.zeitBis)) {
                    alert("hallo")
                    throw new Error();
                }
                var uriUp = "api/zeiterfassung/" + zid;
                fetch(uriUp, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        if (response.status == 400) {
                            throw new Error("HTTP status " + response.status);
                        } else {
                            window.location = "auswahlZeiterfassung.html";

                        }
                    })

                    .catch(error => {
                        document.getElementById("error").innerHTML = "Fehler bei Zeitformat bei von: dd/mm/yyyy hh/mm/ss"
                        console.error('Zeiterfassung wurde nicht geändert', error)
                    });
            } catch {
                document.getElementById("error").innerHTML = "Zeit von darf nicht grösser als Zeit bis sein"
            }
            
            //alert(datumVon);
            //var s = new Date(datumVon).toISOString().slice(0, 19).replace('T', ' ')
            //alert(s);
            
            //alert(JSON.stringify(data));
        });
}
function strToDate(dtStr) {
    if (!dtStr) return null
    let dateParts = dtStr.split("/");
    let timeParts = dateParts[2].split(" ")[1].split(":");
    dateParts[2] = dateParts[2].split(" ")[0];
    // month is 0-based, that's why we need dataParts[1] - 1
    return dateObject = new Date(dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
}