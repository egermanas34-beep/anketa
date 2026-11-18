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
