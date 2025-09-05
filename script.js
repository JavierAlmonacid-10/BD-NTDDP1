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
      resaltarTexto(cards[i], input);
    } else {
      cards[i].style.display = "none";
    }
  }
  actualizarContador();
}

function resaltarTexto(elemento, palabra) {
  let regex = new RegExp(`(${palabra})`, "gi");

  for (let nodo of Array.from(elemento.childNodes)) {
    if (nodo.nodeType === 3) {
      let texto = nodo.nodeValue;
      if (texto.toLowerCase().includes(palabra)) {
        let span = document.createElement("span");
        span.innerHTML = texto.replace(regex, `<span style="background:yellow; text-decoration:underline; font-weight:bold;">$1</span>`);
        elemento.replaceChild(span, nodo);
      }
    } else {
      resaltarTexto(nodo, palabra);
    }
  }
}

// ====== 3. Filtrar por autor ======
function filtrarPorAutor(nombre) {
  let cards = document.getElementsByClassName("card");
  let contador = 0;

  for (let i = 0; i < cards.length; i++) {
    let textoPlano = cards[i].innerText.toLowerCase();
    if (textoPlano.includes(nombre.toLowerCase())) {
      cards[i].style.display = "block";
      contador++;
    } else {
      cards[i].style.display = "none";
    }
  }
  document.getElementById("contador").innerText = contador;
}

// Mostrar todos
function mostrarTodos() {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = "block";
  }
  document.getElementById("contador").innerText = cards.length;
}

// ====== 4. Contador dinámico de artículos ======
function actualizarContador() {
  let cards = document.getElementsByClassName("card");
  let visibles = 0;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].style.display !== "none") {
      visibles++;
    }
  }
  document.getElementById("contador").innerText = visibles;
}

// Llamar contador al cargar
window.onload = actualizarContador;

// ====== 5. Botón "Volver Arriba" ======
window.onscroll = function() {
  let btn = document.getElementById("btnArriba");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

function scrollArriba() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ====== 6. Modo oscuro/claro ======
function toggleModoOscuro() {
  document.body.classList.toggle("modo-oscuro");
}




