function login() {
    var mid = document.getElementById("mid").value;
    var uri = "api/Mitarbeiter/" + mid;
    if (mid.length > 0) {
        fetch(uri)
            .then(response => {
                if (response.status == "200") {
                    return response.json();
                } else {
                    document.getElementById("mitarbeiterFehler").innerHTML = "Mitarbeiter wurde nicht gefunden.";
                    throw new Error("HTTP status " + response.status);
                }
            })
            .then(data => {
                setMitId(data.mitarbeiterId);
            })
            .catch(error => {
                console.error('Mitarbeiter wurde nicht gefunden.', error)
            });
    } else {
        document.getElementById("mitarbeiterFehler").innerHTML = "Mitarbeiter wurde nicht gefunden.";
    }
    
}