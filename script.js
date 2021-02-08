// récupere les bouton
var add = document.getElementById("button");
var suppr = document.getElementById("delete");
// affiche le nombre de personne restante
var number = document.getElementById("number");
// contient les informations des personnes
var array = []

// première lettre en majuscule
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// ajoute la/les personne(s) à la liste
function addGuest() {
    var nom = document.getElementById("name").value;
    var lastName = document.getElementById("lastname").value;

    // si les champs son vide, demande de remplissage
    if (nom == "" || lastName == "") {
        document.getElementById("caution").innerHTML = "veuillez remplir tous champs"
    } else {
        var info = nom.toUpperCase() + " " + lastName.capitalize()
        // vide le text d'erreur
        document.getElementById("caution").innerHTML = "";
        // ajoute la personne au tableau
        array.push(info);
        // recupere l'index de l'element
        var indexElm = array.indexOf(info)
        // ajoute un paragraphe avec l'id correspondant
        document.getElementById("table").appendChild(document.createElement("p")).id = indexElm
        // ajoute les info dans le paragraphe
        document.getElementById(indexElm).innerHTML = info
        // applique le style
        document.getElementById(indexElm).style.border = "none";
        document.getElementById(indexElm).style.textAlign = "left";
        // affiche le nombre de personnes
        number.innerHTML = array.length;
        // vide les champs de saisi
        document.getElementById("name").value = "";
        document.getElementById("lastname").value = "";

        // Transformation en de ul en liste triée (Jquery)
        $(document).ready(function () {
            $('#table').html(
                $('#table p')
                .get()
                .sort(function (a, b) {
                    return (a.innerHTML.replace(/^\s*/, '').toLowerCase() >= b.innerHTML.replace(/^\s*/, '').toLowerCase()) ? 1 : -1;
                })
            )
        })
    }
}

// suprimme la/les personne(s) de la liste
function delGuest() {
    // recupere les infos
    var supprNom = document.getElementById("name").value;
    var supprPrenom = document.getElementById("lastname").value;
    var tab = document.getElementById("table");

    // concatenation nom et prenom
    var sup = supprNom.toUpperCase() + " " + supprPrenom.capitalize();
    // recuperation de l'index
    var place = array.indexOf(sup);
    // log test
    console.log(place);

    // applique le style
    document.getElementById(place).style.border = "none";
    document.getElementById(place).style.textAlign = "left";

    // si les champs sont vide, demande de remplissage
    if (supprNom == "" || supprPrenom == "") {
        document.getElementById("caution").innerHTML = "veuillez remplir le champs"
    } else if (array.length === 0) {
        // si la liste est vide, affichage msg d'erreur
        document.getElementById("caution").innerHTML = "la liste est vide"
    } else if (place === -1) {
        // si la personne n'existe pas, affiche msg d'erreur
        document.getElementById("caution").innerHTML = "la personne n'existe pas"
        // vide les champs de saisi
        document.getElementById("name").value = "";
        document.getElementById("lastname").value = "";
    } else {
        console.log(document.getElementById(place));
        tab.removeChild(document.getElementById(place))
        // supression de la personne dans le tableau html
        array.splice(place, 1);
        // affichage du nombre de personne
        number.innerHTML = array.length;
        // vide le text d'erreur
        document.getElementById("caution").innerHTML = "";
        // vide les champs de saisi
        document.getElementById("name").value = "";
        document.getElementById("lastname").value = "";
    }
}

// verifie la presence de la personne
function searchGuest() {
    var nom = document.getElementById("name").value;
    var prenom = document.getElementById("lastname").value;
    // concatenation nom et prenom
    var info = nom.toUpperCase() + " " + prenom.capitalize();
    // recuperation de l'index
    var place = array.indexOf(info);
    // recupere le bouton
    var add = document.getElementById("button");
    console.log(place);

    if (place < 0) {
        console.log("test");
        add.removeAttribute("disabled", "")
        $("p").css("border", "none")
        $("p").css("textAlign", "left")
    } else {
        var ancre = "#" + place;
        // désactive le bouton ajouter
        add.setAttribute("disabled", "")
        // ammene a la personne trouver
        document.location = ancre
        // applique le style
        document.getElementById(place).style.border = "2px solid black";
        document.getElementById(place).style.textAlign = "center";
    }
}

// verifie la presence de la personne
function verify() {
    // verifie la presence de la personne
    var nom = document.getElementById("name");
    var prenom = document.getElementById("lastname");

    nom.addEventListener("input", function () {
        searchGuest()
    })

    prenom.addEventListener("input", function () {
        searchGuest()
    }) //! a finir
}

// détecte le clic sur le bouton "ajouter" et appel la fonction
add.addEventListener("click", function () {
    addGuest()
})

// détecte le clic sur le bouton "suprimmer" et appel la fonction
suppr.addEventListener("click", function () {
    delGuest()
})

// appel la fonction qui verify la presence de la personne
verify()

// détecte l'appui sur la touche entrée pour valide la saisi (Jquery)
$(document).on("keypress", "input", function (e) {
    if (e.which == 13) {
        addGuest()
    }
})