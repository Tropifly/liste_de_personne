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
        // vide le text d'erreur
        document.getElementById("caution").innerHTML = "";
        // ajoute la personne au tableau
        array.push(nom.toUpperCase() + " " + lastName.capitalize());
        // trie la tableau par ordre alpabetique //! a mettre en option avec un check box
        array.sort();
        // affiche le tableau
        document.getElementById("liste2").innerHTML = array.join()
        // affiche le nombre de personnes
        number.innerHTML = array.length;
        // vide les champs de saisi
        document.getElementById("name").value = "";
        document.getElementById("lastname").value = "";

        // Transformation en de ul en liste triée (Jquery)
        $(document).ready(function () {
            $('#liste').html(
                $('#liste li')
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

    // concatenation nom et prenom
    var sup = supprNom.toUpperCase() + " " + supprPrenom.capitalize();
    // recuperation de l'index
    var place = array.indexOf(sup);

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
        // supression de la personne
        array.splice(place, 1);
        // affiche du tableau actualiser
        document.getElementById("liste2").innerHTML = array.join();
        // affichage du nombre de personne
        number.innerHTML = array.length;
        // vide les champs de saisi
        document.getElementById("name").value = "";
        document.getElementById("lastname").value = "";
    }
}

// détecte le clic sur le bouton "ajouter" et appel la fonction
add.addEventListener("click", function () {
    addGuest()
})

// détecte le clic sur le bouton "suprimmer" et appel la fonction
suppr.addEventListener("click", function () {
    delGuest()
})

// détecte l'appui sur la touche entrée pour valide la saisi (Jquery)
$(document).on("keypress", "input", function (e) {
    if (e.which == 13) {
        addGuest()
    }
})



