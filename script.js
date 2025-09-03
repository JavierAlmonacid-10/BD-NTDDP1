// ====== 1. Mostrar / Ocultar Resumen ======
function toggleResumen(id) {
  const resumen = document.getElementById(id);
  if (resumen.style.display === "none") {
    resumen.style.display = "block";
  } else {
    resumen.style.display = "none";
  }
}

// ====== 2. Buscador de Artículos ======
function buscarArticulos() {
  let input = document.getElementById("buscador").value.toLowerCase();
  let cards = document.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    // Restaurar contenido original solo la primera vez
    if (!cards[i].hasAttribute("data-original")) {
      cards[i].setAttribute("data-original", cards[i].innerHTML);
    } else {
      cards[i].innerHTML = cards[i].getAttribute("data-original");
    }

    let textoPlano = cards[i].innerText.toLowerCase();

    if (input === "") {
      cards[i].style.display = "block";
      continue;
    }

    if (textoPlano.includes(input)) {
      cards[i].style.display = "block";

      // Resaltar coincidencias en el texto de la card
      resaltarTexto(cards[i], input);
    } else {
      cards[i].style.display = "none";
    }
  }
}

function resaltarTexto(elemento, palabra) {
  let regex = new RegExp(`(${palabra})`, "gi");

  for (let nodo of elemento.childNodes) {
    if (nodo.nodeType === 3) {
      // Es un nodo de texto
      let texto = nodo.nodeValue;
      if (texto.toLowerCase().includes(palabra)) {
        let span = document.createElement("span");
        span.innerHTML = texto.replace(regex, `<span style="background:yellow; text-decoration:underline; font-weight:bold;">$1</span>`);
        elemento.replaceChild(span, nodo);
      }
    } else {
      // Recursivo: revisar hijos
      resaltarTexto(nodo, palabra);
    }
  }
}



