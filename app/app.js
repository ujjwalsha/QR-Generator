let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let submit = document.querySelector("[submit-btn]");
let downloadBtn = document.querySelector("[download]");

qrText.value = "";

function GenerateQR() {
  if (qrText.value.length > 0) {
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrText.value}`;
    qrImage.src = qrCode;
    imgBox.classList.add("show-img");
  } else {
    qrText.classList.add("error");
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 1000);
  }
}

submit.addEventListener("click", function () {
  GenerateQR();
});

const downloadQR = async function generate() {
  if (qrText.value.length > 0) {
    console.log("hello");
    const response = await fetch(qrImage.src);
    console.log(response);

    const data = await response.blob();
    console.log(data);

    const link = document.createElement("a");
    link.href = URL.createObjectURL(data);
    console.log(link.href);
    link.download = `${qrText.value}.jpg`;
    link.click();
  } else {
    qrText.classList.add("error");
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 1000);
  }
};

downloadBtn.addEventListener("click", () => {
  downloadQR()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    GenerateQR();
  }
});

document.addEventListener("click", (e) => {
  console.log(e);
});
