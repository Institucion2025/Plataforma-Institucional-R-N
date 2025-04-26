// ---------------------- DATOS DE USUARIOS ----------------------
const usuarios = {
  rector: { user: "rector", pass: "1234", rol: "Rector" },
  docentes: [
    { user: "Registro", pass: "RegistroR&N", rol: "Docente", materiaAsignada: "REGISTRO" },
    { user: "Lengua", pass: "LenguaR&N", rol: "Docente", materiaAsignada: "LENGUA CASTELLANA Y PLAN LECTOR" },
    { user: "Matematicas", pass: "MatematicasR&N", rol: "Docente", materiaAsignada: "MATEMÁTICAS Y GEOMETRÍA" },
    { user: "Ingles", pass: "InglesR&N", rol: "Docente", materiaAsignada: "IDIOMA EXTRANERO (INGLÉS)" },
    { user: "Naturales", pass: "NaturalesR&N", rol: "Docente", materiaAsignada: "CIENCIAS NATURALES Y EDUCACIÓN AMBIENTAL" },
    { user: "Sociales", pass: "SocialesR&N", rol: "Docente", materiaAsignada: "CIENCIAS SOCIALES" },
    { user: "Democracia", pass: "DemocraciaR&N", rol: "Docente", materiaAsignada: "DEMOCRACÍA" },
    { user: "Informatica", pass: "InformaticaR&N", rol: "Docente", materiaAsignada: "TÉCNOLOGIA E INFORMÁTICA" },
    { user: "Artistica", pass: "ArtisticaR&N", rol: "Docente", materiaAsignada: "EDUCACIÓN ARTÍSTICA" },
    { user: "Deportes", pass: "DeportesR&N", rol: "Docente", materiaAsignada: "DEPORTES" },
    { user: "Recreacion", pass: "RecreacionR&N", rol: "Docente", materiaAsignada: "RECREACIÓN" },
    { user: "Educacionfisica", pass: "EducacionfisicaR&N", rol: "Docente", materiaAsignada: "EDUCACIÓN FÍSICA" },
    { user: "Estadistica", pass: "EstadisticaR&N", rol: "Docente", materiaAsignada: "ESTADÍSTICA" },
    { user: "Emprendimiento", pass: "EmprendimientoR&N", rol: "Docente", materiaAsignada: "EMPRENDIMIENTO" },
    { user: "Religion", pass: "ReligionR&N", rol: "Docente", materiaAsignada: "EDUCACIÓN RELIGIOSA Y MORAL" },
    { user: "Etica", pass: "EticaR&N", rol: "Docente", materiaAsignada: "ÉTICA Y VALORES HUMANOS" },
    { user: "Investigacion", pass: "InvestigacionR&N", rol: "Docente", materiaAsignada: "INVESTIGACIÓN" }
  ]
};

// ---------------------- VARIABLES GLOBALES ----------------------
const materias = [
  "LENGUA CASTELLANA Y PLAN LECTOR", "MATEMÁTICAS Y GEOMETRÍA", "IDIOMA EXTRANERO (INGLÉS)",
  "CIENCIAS NATURALES Y EDUCACIÓN AMBIENTAL", "CIENCIAS SOCIALES", "DEMOCRACÍA",
  "TÉCNOLOGIA E INFORMÁTICA", "EDUCACIÓN ARTÍSTICA", "DEPORTES", "RECREACIÓN",
  "EDUCACIÓN FÍSICA", "ESTADÍSTICA", "EMPRENDIMIENTO", "EDUCACIÓN RELIGIOSA Y MORAL",
  "ÉTICA Y VALORES HUMANOS", "INVESTIGACIÓN"
];

let datosNotas = [];
let docenteActual = null;

// ---------------------- FUNCIONES DE LOGIN ----------------------
function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  // Rector
  if (usuarios.rector.user === user && usuarios.rector.pass === pass) {
    iniciarSesion("Rector");
    cargarSelects();
    return;
  }

  // Docente
  const docente = usuarios.docentes.find(d => d.user === user && d.pass === pass);
  if (docente) {
    docenteActual = docente;
    iniciarSesion("Docente");
    cargarSelects();
    return;
  }

  // Estudiante
  const guardadas = localStorage.getItem("notasGuardadas");
  if (guardadas) {
    datosNotas = JSON.parse(guardadas);
    const estudiante = datosNotas.find(n => n.user === user && n.pass === pass);
    if (estudiante) {
      document.getElementById("login").style.display = "none";
      document.getElementById("app").style.display = "block";
      document.getElementById("role").textContent = `Estudiante: ${estudiante.estudiante}`;
      mostrarNotasEstudiante(estudiante.user);
      return;
    }
  }

  alert("Usuario o contraseña incorrecta");
}

function iniciarSesion(rol) {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";
  document.getElementById("role").textContent = rol;

  const guardadas = localStorage.getItem("notasGuardadas");
  if (guardadas) {
    datosNotas = JSON.parse(guardadas);
    mostrarTabla();
  }
}

// ---------------------- FUNCIONES PARA DOCENTES ----------------------
function cargarSelects() {
  const materiaSelect = document.getElementById("materia");
  const gradoSelect = document.getElementById("grado");
  const periodoSelect = document.getElementById("periodo");

  // Limpiar selects
  materiaSelect.innerHTML = "";
  gradoSelect.innerHTML = "";
  periodoSelect.innerHTML = "";

  // Cargar materia
  if (docenteActual && docenteActual.materiaAsignada) {
    const opt = document.createElement("option");
    opt.value = docenteActual.materiaAsignada;
    opt.text = docenteActual.materiaAsignada;
    materiaSelect.appendChild(opt);
    materiaSelect.disabled = true;
  } else {
    materias.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m;
      opt.text = m;
      materiaSelect.appendChild(opt);
    });
    materiaSelect.disabled = false;
  }

  // Cargar grados
  for (let i = 1; i <= 11; i++) {
    const opt = document.createElement("option");
    opt.value = `Grado ${i}`;
    opt.text = `Grado ${i}`;
    gradoSelect.appendChild(opt);
  }

  // Cargar periodos
  for (let i = 1; i <= 4; i++) {
    const opt = document.createElement("option");
    opt.value = `Periodo ${i}`;
    opt.text = `Periodo ${i}`;
    periodoSelect.appendChild(opt);
  }
}

function mostrarFormulario() {
  document.getElementById("formularioNotas").style.display = "block";
}

function guardarNota() {
  const estudiante = document.getElementById("nombreEstudiante").value;
  const saber = parseFloat(document.getElementById("saber").value);
  const hacer = parseFloat(document.getElementById("hacer").value);
  const deber = parseFloat(document.getElementById("deber").value);
  const desempeno = document.getElementById("desempeno").value;
  const definitiva = ((saber + hacer + deber) / 3).toFixed(2);
  const materia = document.getElementById("materia").value;
  const grado = document.getElementById("grado").value;
  const periodo = document.getElementById("periodo").value;

  let estudianteExistente = datosNotas.find(n => n.estudiante === estudiante);
  let user, pass;

  if (estudianteExistente) {
    user = estudianteExistente.user;
    pass = estudianteExistente.pass;
  } else {
    user = estudiante.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000);
    pass = Math.random().toString(36).slice(-8);
    alert(`Usuario creado para ${estudiante}:\nUsuario: ${user}\nContraseña: ${pass}`);
  }

  const nota = {
    estudiante, saber, hacer, deber, definitiva, desempeno,
    materia, grado, periodo,
    user, pass
  };

  datosNotas.push(nota);
  localStorage.setItem("notasGuardadas", JSON.stringify(datosNotas));

  mostrarTabla();
  limpiarFormulario();
}

function limpiarFormulario() {
  document.getElementById("nombreEstudiante").value = "";
  document.getElementById("saber").value = "";
  document.getElementById("hacer").value = "";
  document.getElementById("deber").value = "";
  document.getElementById("desempeno").value = "";
}

function eliminarEstudiante(index) {
  if (index >= 0 && confirm("¿Estás seguro de eliminar este estudiante?")) {
    datosNotas.splice(index, 1);
    localStorage.setItem("notasGuardadas", JSON.stringify(datosNotas));
    mostrarTabla();
  }
}

function mostrarTabla() {
  const tablaDiv = document.getElementById("tablaNotas");
  tablaDiv.innerHTML = "";

  const agrupado = {};
  datosNotas.forEach(nota => {
    const { materia, periodo } = nota;
    if (!agrupado[materia]) agrupado[materia] = {};
    if (!agrupado[materia][periodo]) agrupado[materia][periodo] = [];
    agrupado[materia][periodo].push(nota);
  });

  for (let materia in agrupado) {
    const contenedorMateria = document.createElement("div");
    contenedorMateria.className = "bloqueMateria";
    contenedorMateria.innerHTML = `<h2>Materia: ${materia}</h2>`;

    for (let periodo in agrupado[materia]) {
      const idDiv = `materia-${materia.replace(/\s+/g, '-')}-periodo-${periodo.replace(/\s+/g, '-')}`;
      const contenedorPeriodo = document.createElement("div");
      contenedorPeriodo.className = "bloquePeriodo";
      contenedorPeriodo.id = idDiv;
      contenedorPeriodo.innerHTML = `<h3>Periodo: ${periodo}</h3>`;

      const table = document.createElement("table");
      table.innerHTML = `
        <tr>
          <th>Estudiante</th><th>Saber</th><th>Hacer</th><th>Deber</th>
          <th>Definitiva</th><th>Desempeño</th><th>Grado</th><th>Acción</th>
        </tr>
      `;

      agrupado[materia][periodo].forEach((nota, i) => {
        const indexReal = datosNotas.findIndex(n =>
          n.estudiante === nota.estudiante &&
          n.materia === nota.materia &&
          n.periodo === nota.periodo &&
          n.grado === nota.grado &&
          n.definitiva === nota.definitiva
        );

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${nota.estudiante}</td>
          <td>${nota.saber}</td>
          <td>${nota.hacer}</td>
          <td>${nota.deber}</td>
          <td>${nota.definitiva}</td>
          <td>${nota.desempeno}</td>
          <td>${nota.grado}</td>
          <td><button onclick="eliminarEstudiante(${indexReal})">🗑️ Eliminar</button></td>
        `;
        table.appendChild(row);
      });

      contenedorPeriodo.appendChild(table);

      const btnPDF = document.createElement("button");
      btnPDF.textContent = `Descargar PDF - ${materia} - ${periodo}`;
      btnPDF.onclick = () => descargarPDF(idDiv, `${materia}_${periodo}`);
      contenedorPeriodo.appendChild(btnPDF);

      contenedorMateria.appendChild(contenedorPeriodo);
    }

    tablaDiv.appendChild(contenedorMateria);
  }
}

// ---------------------- FUNCIONES PARA ESTUDIANTES ----------------------
function mostrarNotasEstudiante(user) {
  const tablaDiv = document.getElementById("tablaNotas");
  tablaDiv.innerHTML = "";

  const notas = datosNotas.filter(n => n.user === user);

  const contenedor = document.createElement("div");
  contenedor.className = "notasEstudiante";
  contenedor.innerHTML = `<h2>Tus Notas</h2>`;

  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>Materia</th><th>Periodo</th><th>Grado</th>
      <th>Saber</th><th>Hacer</th><th>Deber</th><th>Definitiva</th><th>Desempeño</th>
    </tr>
  `;

  notas.forEach(n => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${n.materia}</td><td>${n.periodo}</td><td>${n.grado}</td>
      <td>${n.saber}</td><td>${n.hacer}</td><td>${n.deber}</td>
      <td>${n.definitiva}</td><td>${n.desempeno}</td>
    `;
    table.appendChild(row);
  });

  contenedor.appendChild(table);

  const btnPDF = document.createElement("button");
  btnPDF.textContent = "Descargar PDF de mis notas";
  btnPDF.onclick = () => descargarPDF(tablaDiv, `Notas_${user}`);
  contenedor.appendChild(btnPDF);

  tablaDiv.appendChild(contenedor);
}

// ---------------------- PDF GENERACIÓN ----------------------
function descargarPDF(divId, nombreArchivo) {
  const element = typeof divId === "string" ? document.getElementById(divId) : divId;
  html2pdf().from(element).set({
    margin: 0.5,
    filename: `${nombreArchivo.replace(/\s+/g, '_')}.pdf`,
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'landscape' }
  }).save();
}