function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getFrase() {
  const frases = [
    {frase: "El secreto de salir adelante es comenzar", autor: ""},
    {frase: "El exito es ir de fracaso en fracaso sin perder el entuasiasmo", autor: ""},
    {frase: "Si tu sabes lo que vales, ve y consigue lo que mereces", autor: ""},
    {frase: "Podemos encontrar muchas derrotas pero no debemos ser derrotados", autor: ""},
    {frase: "La magia es creer en ti mismo. Si puedes hacer eso, puedes hacer que suceda cualquier cosa", autor: ""},
    {frase: "Tenemos que hacer lo mejor que somos capaces de hacer. Esta es nuestra sagrada responsabilidad como humanos", autor: ""},
    {frase: "Todo lo que siempre has querido está al otro lado del miedo", autor: ""},
    {frase: "Lo importante no es que hagas más, sino que hagas mejor", autor: "Valeria Pera"},
  ]
  return frases[getRandomInt(0, frases.length - 1)];
}

function getLandscape() {
  return fetch("https://api.unsplash.com/photos/random?query=travel-landscape&orientation=landscape", {
    method:"GET",
    headers: {
      "Accept-Version": "v1",
      "Authorization": "Client-ID 21e3689f60a6b996414262713bbb790f8028c3ab6531a580d800c8d1c1a859dc"
    }
  }).then(response => {
    return response.json();
  }).then(jsonResponse => {
    const photo = jsonResponse;
    return {
      id: photo.id,
      photoUrl: photo.urls.regular,
      location: photo.location,
      color: photo.color,
      autor: photo.user.name,
      unsplash: photo.links.html,
    }
  })
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getBrightness(rgb) {
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}

function isDark(rgb) {
  return getBrightness(rgb) < 128;
}

window.onload = function () {
  const frase = getFrase();
  const frame = window.document.getElementById("frase");
  frame.innerHTML += `"${frase.frase}"`;
  const autor = window.document.getElementById("autor");
  autor.innerHTML += `- ${frase.autor !== '' ? frase.autor : 'Anonimo'}`;
  const unsplash = document.querySelector(".unsplash-credit");
  // getLandscape().then((landscape) => {
  //   let color = "black"
  //   let shadow = "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white";
  //   if (isDark(landscape.color)) {
  //     color = "white"
  //     shadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
  //   }
  //   if (landscape.location.title) {
  //     const location = window.document.getElementById("location");
  //     location.style.textShadow = shadow;
  //     location.style.color = color;
  //     location.innerHTML += `<i class="material-icons icon">my_location</i> ${landscape.location.title}`
  //   }

  //   unsplash.setAttribute("href", landscape.unsplash);
  //   unsplash.innerHTML += `Foto por ${landscape.autor}`;
  //   frame.style.textShadow = shadow;
  //   frame.style.color = color;
  //   autor.style.textShadow = shadow;
  //   autor.style.color = color;
  //   window.document.body.style.backgroundImage = `url('${landscape.photoUrl}')`;
  // })
}
