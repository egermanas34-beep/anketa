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
