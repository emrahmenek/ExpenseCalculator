const giderInput = document.querySelector(`#gider`);
const fiyatInput = document.querySelector(`#fiyat`);
const statusCheck = document.querySelector(`#status-input`);
const formBtn = document.querySelector(`.ekle-btn`);
const liste = document.querySelector(`.liste`);
const toplamBilgi = document.querySelector(`#toplam-bilgi`);
const selectFilter = document.querySelector(`#filter-select`);

//izleme işlemleri
formBtn.addEventListener("click", addExpense);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);
// toplam state'i(durum)
let toplam = 0;

function updateToplam(fiyat) {
  toplam += Number(fiyat);
  toplamBilgi.innerText = toplam;
}

// gider olusturma
function addExpense(e) {
  e.preventDefault();

  // dogrulama yapma
  if (!fiyatInput.value || !giderInput.value) {
    alert("Formlari Doldurun");
    // fonksiyonu durduruyoruz
    return;
  }
  //div olusturma
  const giderDiv = document.createElement(`div`);

  // clas ekleme
  giderDiv.classList.add("gider");
  // eğer checkbox tiklandiysa
  if (statusCheck.checked) {
    giderDiv.classList.add(`payed`);
  }

  // icerğini ayarlama
  giderDiv.innerHTML = `
                <h2>${giderInput.value}</h2>
                <h2 id="value" >${fiyatInput.value}</h2>
                <div class="buttons">
                    <img id="payment" src="/images/pay.png"/>
                    <img id="remove" src="/images/remove.png"/>
                </div>
                 `;
  // olusan gideri htmle gönderme
  liste.appendChild(giderDiv);

  // toplamı guncelle
  updateToplam(fiyatInput.value);
  // formu temizleme
  giderInput.value = "";
  fiyatInput.value = "";
}

//listeye tiklanma olayini yönet

function handleClick(e) {
  //tiklanilan elemani alma
  const element = e.target;

  if (element.id === "remove") {
    //tiklanilan sil butonunun kapsayicisini alma
    const wrapperElement = element.parentElement.parentElement;

    //silinen elemanin fiyati
    const deletedPriceElement =
      wrapperElement.querySelector("#value").innerText;
    Number(deletedPrice);

    //silinenin fiyatini toplamdan cikarma
    updateToplam(-Number(deletedPrice));

    //kapsayiciyi htmlden kaldirma
    wrapperElement.remove();
  }
}

//filtreleme işlemi
function handleFilter(e) {
  const items = liste.childNodes;

  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }

        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }

        break;
    }
  });
}
