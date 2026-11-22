const issilavinimas = document.getElementById("issilavinimas");
const kolegija = document.querySelector(".kolegija");
const universitetas = document.querySelector(".universitetas");

function rodytiGrupe(grupe, rodyti) {
  grupe.hidden = !rodyti;
  grupe.querySelectorAll("input, select, textarea").forEach((input) => {
    input.disabled = !rodyti;
  });
}
function atnaujintiPasirinkimusIssilavinimo() {
  const pasirinkimas = issilavinimas.value;
  rodytiGrupe(kolegija, pasirinkimas === "aukstasis-kolegijinis");
  rodytiGrupe(universitetas, pasirinkimas === "aukstasis-universiteto");
}
issilavinimas.addEventListener("change", atnaujintiPasirinkimusIssilavinimo);
// Iškviečiame funkciją, kad nustatytume pradinę būseną
atnaujintiPasirinkimusIssilavinimo();

const vedybinePadetis = document.getElementById("vedybine_padetis");
const vedes = document.querySelector(".vedes-istekejusi");
const isimtiesGrupe = document.querySelector(".santuokos-isimtis");
const turiLeidima = document.getElementById("turi_leidima");
turiLeidima.addEventListener("change", () => {
  tikrintiSantuokosAmziu();
});
function atnaujintiPasirinkimusVedybinePadetis() {
  const pasirinkimas = vedybinePadetis.value;
  rodytiGrupe(vedes, pasirinkimas === "vedes/istekejusi");
}
vedybinePadetis.addEventListener(
  "change",
  atnaujintiPasirinkimusVedybinePadetis,
);
// Iškviečiame funkciją, kad nustatytume pradinę būseną
atnaujintiPasirinkimusVedybinePadetis();
const gimimoData = document.querySelector('input[name="gimimo_data"]');
const vedesOption = document.querySelector('option[value="vedes/istekejusi"]');
const issiskyresOption = document.querySelector(
  'option[value="issiskyres(-usi)"]',
);
function apskaiciuotiAmziu() {
  if (!gimimoData.value) {
    return null;
  }
  const siandien = new Date();
  const [metai, menesis, diena] = gimimoData.value.split("-").map(Number);
  let amzius = siandien.getFullYear() - metai;
  if (
    siandien.getMonth() < menesis - 1 ||
    (siandien.getMonth() === menesis - 1 && siandien.getDate() < diena)
  ) {
    amzius--;
  }
  return amzius;
}
function tikrintiSantuokosAmziu() {
  const amzius = apskaiciuotiAmziu();
  const rodytiIsimti = amzius !== null && amzius >= 16 && amzius < 18;
  rodytiGrupe(isimtiesGrupe, rodytiIsimti);
  if (!rodytiIsimti) {
    turiLeidima.checked = false;
  }
  const galimaSusituokti =
    amzius !== null &&
    (amzius >= 18 || (amzius >= 16 && amzius < 18 && turiLeidima.checked));
  vedesOption.disabled = !galimaSusituokti;
  issiskyresOption.disabled = !galimaSusituokti;
  if (
    !galimaSusituokti &&
    (vedybinePadetis.value === "vedes/istekejusi" ||
      vedybinePadetis.value === "issiskyres(-usi)")
  ) {
    vedybinePadetis.value = "";
  }
  atnaujintiPasirinkimusVedybinePadetis();
}
gimimoData.addEventListener("change", tikrintiSantuokosAmziu);
tikrintiSantuokosAmziu();
const darboPadetis = document.querySelector('select[name="darbo_padetis"]');
const studentasOption = document.querySelector(".studentas");
const dirbuOption = document.querySelector(".dirbu");
const nedirbuOption = document.querySelector(".nedirbu");
const motTevOption = document.querySelector(".mot-tev-atostogos");

function atnaujintiPasirinkimusDarboPadetis() {
  const pasirinkimas = darboPadetis.value;
  rodytiGrupe(studentasOption, pasirinkimas === "studijuoju");
  rodytiGrupe(dirbuOption, pasirinkimas === "dirbu");
  rodytiGrupe(nedirbuOption, pasirinkimas === "nedirbu");
  rodytiGrupe(motTevOption, pasirinkimas === "mot.tev.atostogos");
}
darboPadetis.addEventListener("change", atnaujintiPasirinkimusDarboPadetis);
// Iškviečiame funkciją, kad nustatytume pradinę būseną
atnaujintiPasirinkimusDarboPadetis();
const lytis = document.querySelector('select[name="lytis"]');
const asmensKodas = document.querySelector('input[name="asmens_kodas"]');
const kodoPradzia = document.getElementById("kodo_pradzia");
const kodoPabaiga = document.getElementById("kodo_pabaiga");
const asmensKodoKlaida = document.getElementById("asmens-kodo-klaida");
const asmensKodoGrupe = document.querySelector(".asmens-kodas");
function atnaujintiAsmensKoda() {
  if (!gimimoData.value || !lytis.value) {
    kodoPradzia.value = "";
    sujungtiAsmensKoda();
    return;
  }
  const [metai, menesis, diena] = gimimoData.value.split("-");
  const gimimoMetai = Number(metai);
  let pirmasSkaitmuo;
  if (gimimoMetai >= 1800 && gimimoMetai < 1900) {
    pirmasSkaitmuo = lytis.value === "vyras" ? 1 : 2;
  } else if (gimimoMetai >= 1900 && gimimoMetai < 2000) {
    pirmasSkaitmuo = lytis.value === "vyras" ? 3 : 4;
  } else if (gimimoMetai >= 2000 && gimimoMetai < 2100) {
    pirmasSkaitmuo = lytis.value === "vyras" ? 5 : 6;
  } else {
    kodoPradzia.value = "";
    sujungtiAsmensKoda();
    return;
  }
  kodoPradzia.value = pirmasSkaitmuo + metai.slice(-2) + menesis + diena;
  sujungtiAsmensKoda();
}
function sujungtiAsmensKoda() {
  const pradzia = kodoPradzia.value;
  const pabaiga = kodoPabaiga.value;
  let klaidingas = false;
  if (pradzia.length === 7 && pabaiga.length === 4) {
    asmensKodas.value = pradzia + pabaiga;
    klaidingas = !patikrintiAsmensKoda(asmensKodas.value);
  } else {
    asmensKodas.value = "";
  }
  kodoPabaiga.setCustomValidity(
    klaidingas ? "Neteisingas asmens kodo kontrolinis skaitmuo!" : "",
  );
  asmensKodoKlaida.hidden = !klaidingas;
  asmensKodoGrupe.classList.toggle("klaidingas", klaidingas);
}
gimimoData.addEventListener("change", atnaujintiAsmensKoda);
lytis.addEventListener("change", atnaujintiAsmensKoda);
kodoPabaiga.addEventListener("input", () => {
  kodoPabaiga.value = kodoPabaiga.value.replace(/\D/g, "").slice(0, 4);
  sujungtiAsmensKoda();
});
function patikrintiAsmensKoda(kodas) {
  if (!/^\d{11}$/.test(kodas)) {
    return false;
  }
  const skaiciai = kodas.split("").map(Number);
  const koeficientai1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
  const koeficientai2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];
  let suma = 0;
  for (let i = 0; i < 10; i++) {
    suma += skaiciai[i] * koeficientai1[i];
  }
  let kontrolinis = suma % 11;
  if (kontrolinis === 10) {
    suma = 0;
    for (let i = 0; i < 10; i++) {
      suma += skaiciai[i] * koeficientai2[i];
    }
    kontrolinis = suma % 11;
    if (kontrolinis === 10) {
      kontrolinis = 0;
    }
  }
  return kontrolinis === skaiciai[10];
}
atnaujintiAsmensKoda();
const telefonoNumeris = document.getElementById("telefono_numeris");
function patikrintiTelefonoNumeri() {
  const numeris = telefonoNumeris.value.replace(/[\s()-]/g, "");
  const tinkamas = /^\+[1-9]\d{7,14}$/.test(numeris);
  if (tinkamas) {
    telefonoNumeris.setCustomValidity("");
  } else {
    telefonoNumeris.setCustomValidity("Neteisingas telefono numeris! ");
  }
}
telefonoNumeris.addEventListener("input", patikrintiTelefonoNumeri);
patikrintiTelefonoNumeri();
const anketa = document.getElementById("anketa");
let anketosDuomenys = {};
anketa.addEventListener("submit", (event) => {
  event.preventDefault();
  const duomenys = new FormData(anketa);
  anketosDuomenys = Object.fromEntries(duomenys.entries());
  console.log("Anketos duomenys:", anketosDuomenys);
  alert("Anketa sėkmingai pateikta!");
});
const etapai = document.querySelectorAll(".etapas");
const progresoJuosta = document.getElementById("progreso-juosta");
const progresoTekstas = document.getElementById("progreso-tekstas");
let dabartinisEtapas = 0;
function rodytiEtapa() {
  etapai.forEach((etapas) => {
    etapas.hidden = true;
  });
  etapai[dabartinisEtapas].hidden = false;
  atnaujintiProgresoJuosta();
}
rodytiEtapa();
const toliauMygtukai = document.querySelectorAll(".toliau");
toliauMygtukai.forEach((mygtukas) => {
  mygtukas.addEventListener("click", () => {
    if (dabartinisEtapas < etapai.length - 1 && patikrintiEtapa()) {
      dabartinisEtapas++;
      rodytiEtapa();
    }
  });
});
const atgalMygtukai = document.querySelectorAll(".atgal");
atgalMygtukai.forEach((mygtukas) => {
  mygtukas.addEventListener("click", () => {
    if (dabartinisEtapas > 0) {
      dabartinisEtapas--;
      rodytiEtapa();
    }
  });
});
function patikrintiEtapa() {
  const laukai = etapai[dabartinisEtapas].querySelectorAll(
    "input, select, textarea",
  );
  for (const laukas of laukai) {
    if (!laukas.checkValidity()) {
      laukas.reportValidity();
      console.log("Laukas netinkamas:", laukas.name);
      return false;
    }
  }
  return true;
}

function atnaujintiProgresoJuosta() {
  progresoJuosta.value = dabartinisEtapas + 1;
  progresoTekstas.textContent = `${dabartinisEtapas + 1} iš ${etapai.length}`;
}
