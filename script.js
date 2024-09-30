// Creacion de elementos del DOM
let body = document.querySelector("body");
let contenedor = document.getElementById("container");
let indicadorFechaObjetivo = document.createElement("h2");
let input = document.createElement("input");
let boton = document.createElement("button");
let tiempoRestante = document.createElement("h1"); 

tiempoRestante.setAttribute("id", "tiempoRestante");
tiempoRestante.textContent = "Tiempo restante";
contenedor.appendChild(tiempoRestante);
indicadorFechaObjetivo.setAttribute("id", "indicadorFechaObjetivo");
indicadorFechaObjetivo.textContent = "Fecha objetivo";
contenedor.appendChild(indicadorFechaObjetivo);
input.placeholder = "ingrese la fecha Año-Mes-Dia";
contenedor.appendChild(input);
boton.textContent = "Cambiar fecha";
contenedor.appendChild(boton);
input.setAttribute("id", "nuevaFecha");
boton.setAttribute("id", "boton");

let intervalo;//se inicializa aqui para poder limpiarlo despues de usarlo


/**
 * Calcula la cuenta atrás entre la fecha actual y la fecha objetivo,
 * y convierte la diferencia en días, horas, minutos y segundos.
 */
function calcularCuentaAtras(fechaObjetivo) {
  let fechaHoy = new Date();
  let diferencia = fechaObjetivo - fechaHoy; 

  let segundos = Math.floor((diferencia / 1000) % 60);
  let minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  let horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

  return {
    dias: dias,
    horas: horas,
    minutos: minutos,
    segundos: segundos,
  };
}

/**
 * Muestra el tiempo restante en la etiqueta que creamos <h1> y le cambiamos el estilo segun toque
 */
function mostrarCuentaAtras(tiempo) {

  tiempoRestante.classList.remove("dosMeses", "unMes", "dosSemana");
  body.classList.remove("imagen1", "imagen2", "imagen3");
  
  if(tiempo.dias >=30){
    tiempoRestante.classList.add("masDeUnMeses");
    body.classList.add("imagen1");
  }else if(tiempo.dias <=30 && tiempo.dias >=14){
    body.classList.add("imagen2");

    tiempoRestante.classList.add("unMes");  
  }else if(tiempo.dias <=14){
    body.classList.add("imagen3");

    tiempoRestante.classList.add("dosSemana");
  }
  tiempoRestante.textContent = `Tiempo restante: ${tiempo.dias} días, ${tiempo.horas} horas, ${tiempo.minutos} minutos, ${tiempo.segundos} segundos`;
}




//evento para el boton que cambia la frhca objetivo e inicia la cuenta atras
boton.addEventListener("click", () => {
  let fechaIntroducida = document.getElementById("nuevaFecha").value;
  let fechaObjetivo = new Date(fechaIntroducida);

  if (isNaN(fechaObjetivo.getTime())) {
    alert("Por favor ingrese una fecha válida");
    return;
  }

  iniciarCuentaAtras(fechaObjetivo);
});


/**
 * Inicia el temporizador de cuenta atrás.
 */
function iniciarCuentaAtras(fechaObjetivo) {
  //para que no muestre varias cuentas atras al cambiar la fecha
  if (intervalo) {
    clearInterval(intervalo);
  }

   intervalo = setInterval(() => {
    let tiempo = calcularCuentaAtras(fechaObjetivo); 

    if (tiempo.dias <= 0 && tiempo.horas <= 0 && tiempo.minutos <= 0 && tiempo.segundos <= 0) {
      clearInterval(intervalo);
      tiempoRestante.textContent = "¡El tiempo ha terminado!";
    } else {
      mostrarCuentaAtras(tiempo); 
    }
  }, 1000); 
}

