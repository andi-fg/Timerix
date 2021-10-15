var mitarbeiter;
var zid
init();
function init() {
    mitarbeiter = initFooter();
    fetchArbeitsvorgang()
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
function speichern() {
    var pid = document.getElementById("pid").value;
    var aid = document.getElementById("aid").value;
    var aVorgang = JSON.parse(document.getElementById('arbeitsvorgangSelect').value);
    var uriProd = "api/produktionsstrasse/" + pid;
    var uriAuftrag = "api/auftrag/" + aid;
    //var uriProd = "api/produktionsstrasse/neu/" + pid + "/" + mitarbeiter.standortId;
    //var uriAuftrag = "api/auftrag/" + mitarbeiter.auftragPraefix + "" + aid;
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
                    //alert(JSON.stringify(output))
                    addZeiterfassung(output);
                })
                .catch(error => {
                    document.getElementById("error").innerHTML = "Auftrag wurde nicht gefunden"
                    console.error('Auftrag wurde nicht gefunden.', error)
                });
        })
        .catch(error => {
            document.getElementById("error").innerHTML = "Strasse wurde nicht gefunden."
            console.error('Strasse wurde nicht gefunden.', error)
        });
}
function addZeiterfassung(output) {
    var uriMitarbeiter = "api/mitarbeiter/" + mitarbeiter.mitarbeiterId;
    fetch(uriMitarbeiter)
        .then(response => response.json())
        .then(data => {
            var zeiterfassung = {};
            zeiterfassung.mitarbeiter = data;
            zeiterfassung.auftragId = output.dataAuftrag.auftragId
            zeiterfassung.auftrag = output.dataAuftrag;
            zeiterfassung.produktionsstrasseId = output.dataProd.produktionsstrasseId
            zeiterfassung.produktionsstrasse = output.dataProd;
            zeiterfassung.arbeitsvorgangId = output.aVorgang.arbeitsvorgangId;
            zeiterfassung.arbeitsvorgang = output.aVorgang;
            var dVon = document.getElementById("von").value;
            var dBis = document.getElementById("bis").value;
            try {
                var datumVon = strToDate(dVon);
                datumVon.setHours(datumVon.getHours() + 2);
                var datumBis = strToDate(dBis);
                if (datumBis > Date.now()) {
                    throw new Error();
                }
                datumBis.setHours(datumBis.getHours() + 2);
                zeiterfassung.zeitVon = datumVon;
                zeiterfassung.zeitBis = datumBis;
                if (datumVon > datumBis) {
                    throw new Error();
                }
                if (isNaN(zeiterfassung.zeitBis.getTime())) {
                    document.getElementById("error").innerHTML = "Fehler bei Zeitformat bei von: dd/mm/yyyy hh/mm/ss";
                } else {
                    var uriUp = "api/zeiterfassung";
                    fetch(uriUp, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(zeiterfassung)
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
                }
            } catch {
                document.getElementById("error").innerHTML = "Zeit von darf nicht grösser als Zeit bis sein und bis nicht grösser als die aktuelle Uhrzeit sein"
            }

            //alert(datumBis);
            //var s = new Date(datumVon).toISOString().slice(0, 19).replace('T', ' ')
            //alert(s);

            //alert(JSON.stringify(zeiterfassung));
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