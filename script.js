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
  vedesOption.disabled = amzius < 18 || amzius === null;
  issiskyresOption.disabled = amzius < 18 || amzius === null;
  if (
    (vedesOption.disabled && vedybinePadetis.value === "vedes/istekejusi") ||
    (issiskyresOption.disabled && vedybinePadetis.value === "issiskyres(-usi)")
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
  if (pradzia.length === 7 && pabaiga.length === 4) {
    asmensKodas.value = pradzia + pabaiga;
  } else {
    asmensKodas.value = "";
  }
}
gimimoData.addEventListener("change", atnaujintiAsmensKoda);
lytis.addEventListener("change", atnaujintiAsmensKoda);
kodoPabaiga.addEventListener("input", () => {
  kodoPabaiga.value = kodoPabaiga.value.replace(/\D/g, "").slice(0, 4);
  sujungtiAsmensKoda();
});
atnaujintiAsmensKoda();
