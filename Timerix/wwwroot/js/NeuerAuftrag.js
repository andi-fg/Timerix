var mitarbeiter;
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

function auftragInitialisieren() {
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
                    zeiterfassungDatenZuSession(output);
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
function zeiterfassungDatenZuSession(data) {
    var uri = "session/zeiterfassungDaten";
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
             window.location = "auftragbestaetigung.html";
        })

        .catch(error => console.error('Unable to add user.', error));
}
