let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let submit = document.querySelector("[submit-btn]");
let downloadBtn = document.querySelector("[download]");

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

downloadBtn.addEventListener("click", async () => {
  console.log("hello");
  const response = await fetch(qrImage.src);
  console.log(response);

  const data = await response.blob();
  console.log(data);

  const link = document.createElement("a");
  link.href = URL.createObjectURL(data);
  console.log(link.href);
  link.download = "qrcode.jpg";
  link.click();
});

const downloadPdf = document.querySelector("[download-pdf]");

downloadPdf.addEventListener("click", async () => {
  const response = await fetch("DEMO.pdf");
  console.log(response);

  const data = await response.blob();
  console.log(data);

  const link = document.createElement("a");
  link.href = URL.createObjectURL(data);
  console.log(link.href);
  link.download = "DEMO.pdf";
  link.click();
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    GenerateQR();
  }
});
