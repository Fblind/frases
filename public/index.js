function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getFrase() {
  const frases = [
    {frase: "El secreto de salir adelante es comenzar.", autor: ""},
    {frase: "El exito es ir de fracaso en fracaso sin perder el entuasiasmo.", autor: ""},
    {frase: "Si tu sabes lo que vales, ve y consigue lo que mereces.", autor: ""},
    {frase: "Podemos encontrar muchas derrotas pero no debemos ser derrotados.", autor: ""},
    {frase: "La magia es creer en ti mismo. Si puedes hacer eso, puedes hacer que suceda cualquier cosa.", autor: "Johann Wolfgang von Goethe"},
    {frase: "Tenemos que hacer lo mejor que somos capaces de hacer. Esta es nuestra sagrada responsabilidad como humanos.", autor: "Albert Einstein"},
    {frase: "Todo lo que siempre has querido está al otro lado del miedo.", autor: "George Addair"},
    {frase: "Lo importante no es que hagas más, sino que hagas mejor", autor: "Valeria Pera"},
    {frase: "El mejor momento para empezar fue el año pasado. El segundo mejor momento es ahora.", autor: "Seth Godin"},
    {frase: "Nuestra mayor gloria no es nunca caer, sino elevarnos cada vez que caemos.", autor: "Confucio"},
    {frase: "Dos caminos se bifurcaron en un bosque y tomé el menos transitado; eso ha marcado la diferencia.", autor: "Robert Frost"},
    {frase: "Si eres libre, necesitas liberar a alguien más. Si tienes algún poder, entonces tu trabajo es empoderar a alguien más.", autor: "Toni Morrison"},
    {frase: "Estoy preparado para lo peor, pero espero lo mejor.", autor: "Benjamin Disraeli"},
    {frase: "Hay algo bueno en este mundo y vale la pena luchar por ello.", autor: "J.R.R. Tolkien"},
    {frase: "Todos nuestros sueños pueden hacerse realidad, si tenemos el coraje de perseguirlos.", autor: "Walt Disney"},
    {frase: "No importa qué tan lento vayas, siempre y cuando no te detengas.", autor: "Confucio"},
    {frase: "El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el coraje para continuar.", autor: "Winston Churchill"},
    {frase: "Comienza ahora a ser desde hoy lo que serás en el futuro.", autor: "San Jerónimo"},
    {frase: "Cree en ti mismo. Eres más valiente de lo que crees, más talentoso de lo que sabes y capaz de más de lo que imaginas.", autor: "Roy T. Bennett"},
    {frase: "Aprendí que el coraje no era la ausencia de miedo, sino el triunfo sobre él. El hombre valiente no es el que no siente miedo, sino el que vence ese miedo.", autor: "Nelson Mandela"},
    {frase: "El mundo está lleno de cosas mágicas, esperando pacientemente a que nuestros sentidos se agudicen.", autor: "W.B. Yeats"},
    {frase: "Si no estás dispuesto a arriesgar lo inusual, tendrás que conformarte con lo ordinario.", autor: "Jim Rohn"},
    {frase: "Aprende a decir “no” a lo bueno; para que pueda decir “sí” a lo mejor.", autor: "John C. Maxwell"},
    {frase: "Las grandes cosas nunca vienen de las zonas de confort.", autor: "Neil Strauss"},
    {frase: "Cuando tienes confianza, puedes divertirte mucho. Y cuando te diviertes, puedes hacer cosas increíbles.", autor: "Joe Namath"},
    {frase: "Si quieres algo que nunca tuviste, tienes que hacer algo que nunca has hecho.", autor: "Thomas Jefferson"},
    {frase: "No hay nada noble en ser superior a tu prójimo. La verdadera nobleza es ser superior a tu yo anterior.", autor: "Ernest Hemingway"},
    {frase: "No vinimos a temerle al futuro. Vinimos aquí para darle forma.", autor: "Barack Obama"},
    {frase: "Los que ceden a las tendencias, las modas y la opinión popular; no logran grandes cosas.", autor: "Jack Kerouac"},
    {frase: "La adversidad revela el genio, la prosperidad lo oculta.", autor: "Horace Haz"},
    {frase: "Nunca permitas que las probabilidades te impidan hacer lo que sabes que debes hacer.", autor: "H. Jackson Brown Jr"},
    {frase: "El primero en pedir disculpas es el más valiente. El primero en perdonar es el más fuerte. Pero el primero en olvidar es el más feliz.", autor: ""},
    {frase: "No juzgues cada día por la cosecha que cosechas; sino por las semillas que plantas.", autor: "Robert Louis Stevenson"},
    {frase: "Nunca confundas una sola derrota con una derrota final.", autor: "F. Scott Fitzgerald"},
    {frase: "El momento más aterrador es siempre justo antes de empezar.", autor: "Stephen King"},
    {frase: "Sé amoroso contigo mismo, entonces también podrás amar a los demás.", autor: "Osho"},
    {frase: "Cuando expresamos nuestra gratitud, nunca debemos olvidar que la mayor apreciación no es decir las palabras; sino vivir de acuerdo con ellas.", autor: "John F. Kennedy"},
  ]
  return frases[getRandomInt(0, frases.length - 1)];
}

function getLandscape() {
  // return Promise.resolve({
  //   photoUrl: "https://images.unsplash.com/uploads/141202612010220122e66/d8d64202?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjk0ODIxfQ",
  //   location: {title: "Santiago del Estero, Argentina"},
  //   color: "#000",
  //   autor: "Facundo",
  //   unsplash: "http://blabla.com"
  // })
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
  getLandscape().then((landscape) => {
    let color = "black"
    let shadow = "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white";
    if (isDark(hexToRgb(landscape.color))) {
      color = "white"
      shadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
    }
    if (landscape.location.title) {
      const location = window.document.getElementById("location");
      location.style.textShadow = shadow;
      location.style.color = color;
      location.innerHTML += `<i class="material-icons icon">my_location</i> ${landscape.location.title}`
    }

    unsplash.setAttribute("href", landscape.unsplash);
    unsplash.innerHTML += `Foto por ${landscape.autor}`;
    frame.style.textShadow = shadow;
    frame.style.color = color;
    autor.style.textShadow = shadow;
    autor.style.color = color;
    window.document.body.style.backgroundImage = `url('${landscape.photoUrl}')`;
  })
}
