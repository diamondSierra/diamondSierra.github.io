let squareImagedata, tallImageData;

const setTheme = (primary, secondary, logoSrc) => {
  const root = document.querySelector(":root");
  root.style.setProperty("--primary-color", primary);
  root.style.setProperty("--secondary-color", secondary);
  root.style.setProperty("--logo-src", logoSrc);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const primaryColor = getComputedStyle(document.body).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(document.body).getPropertyValue("--secondary-color");

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 1080;
  canvas.height = 1920;

  context.fillStyle = primaryColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const padding = 200;
  const text = $("#input").val().toUpperCase();
  context.font = "300px Chromakopia";
  context.fillStyle = secondaryColor;
  //   context.textAlign = "center";
  let textMetrics = context.measureText(text);
  let letterSpacing = -15;
  let textWidth = textMetrics.width + text.length * letterSpacing;
  const fontSize = Math.min(
    (Math.round(((canvas.width - padding) / textWidth) * 100) / 100) * 300,
    300
  );
  context.font = `${fontSize}px Chromakopia`;
  letterSpacing = (letterSpacing / 300) * fontSize;
  textMetrics = context.measureText(text);
  textWidth = textMetrics.width + text.length * letterSpacing;
  const textBottom = canvas.height / 2;
  const textTop = textBottom - fontSize / 2;
  let textLeft = (canvas.width - textWidth) / 2;

  [...text].forEach((letter) => {
    context.fillText(letter, textLeft, textBottom);
    textLeft += context.measureText(letter).width + letterSpacing;
  });
  //   context.fillText(text, canvas.width / 2, textBottom);

  const wokeUpImage = new Image();
  wokeUpImage.src = `./assets/woke-up-${primaryColor === "#000000" ? "green" : "black"}.png`;
  await wokeUpImage.decode();
  context.drawImage(wokeUpImage, (canvas.width - wokeUpImage.width) / 2, textBottom + 10);

  const chromakopiaImage = new Image();
  chromakopiaImage.src = `./assets/logo-chromakopia-${
    primaryColor === "#000000" ? "green" : "black"
  }.png`;
  await chromakopiaImage.decode();
  context.drawImage(chromakopiaImage, (canvas.width - 860) / 2, textBottom + 60, 860, 130);

  const hornLeftImage = new Image();
  hornLeftImage.src = `./assets/horn-left-${primaryColor === "#000000" ? "green" : "black"}.png`;
  await hornLeftImage.decode();
  const hornRightImage = new Image();
  hornRightImage.src = `./assets/horn-right-${primaryColor === "#000000" ? "green" : "black"}.png`;
  await hornRightImage.decode();

  const hornHeight = fontSize * (2 / 6);
  const hornWidth = (hornHeight * 937) / 2051;
  const hornTop = textTop - hornHeight * 0.9;
  let hornLeft = (canvas.width - textWidth) / 2;
  let hornRight = canvas.width - hornLeft - hornWidth;
  if (text[0] in letterOffsets) {
    hornLeft += letterOffsets[text[0]].left * hornWidth;
  }
  if (text[text.length - 1] in letterOffsets) {
    hornRight -= letterOffsets[text[text.length - 1]].right * hornWidth;
  }
  context.drawImage(hornLeftImage, hornLeft, hornTop, hornWidth, hornHeight);
  context.drawImage(hornRightImage, hornRight, hornTop, hornWidth, hornHeight);

  tallImageData = canvas.toDataURL("image/png");
  $("#image-tall").attr("src", tallImageData);
  $("#download").attr("href", tallImageData);
  $("#download").attr("download", "chromakopia.png");

  //   const squareCanvas = document.createElement("canvas");
  //   squareCanvas.width = canvas.width;
  //   squareCanvas.height = canvas.width;
  //   squareCanvasContext = squareCanvas.getContext("2d");
  //   squareCanvasContext.drawImage(canvas, 0, (squareCanvas.height - canvas.height) / 2);

  //   squareImageData = squareCanvas.toDataURL("image/png");
  //   $("#image-square").attr("src", squareImageData);

  $("#container-form").removeClass("flex").addClass("hidden");
  $("#container-results").removeClass("hidden").addClass("flex");

  return false;
};

// $("#download").on("click", () => {
//   const squareDownloadLink = $("<a></a>");
//   $(squareDownloadLink).attr("href", squareImageData);
//   $(squareDownloadLink).attr("download", "chromakopia-square.png");
//   $("body").append(squareDownloadLink);
//   $(squareDownloadLink).get(0).click();
//   $(squareDownloadLink).remove();

//   setTimeout(() => {
//     const tallDownloadLink = $("<a></a>");
//     $(tallDownloadLink).attr("href", tallImageData);
//     $(tallDownloadLink).attr("download", "chromakopia-tall.png");
//     $("body").append(tallDownloadLink);
//     $(tallDownloadLink).get(0).click();
//     $(tallDownloadLink).remove();
//   }, 100);
// });

const handleBack = () => {
  $("#container-results").removeClass("flex").addClass("hidden");
  $("#container-form").removeClass("hidden").addClass("flex");
};

const letterOffsets = {
  A: { left: 0.8, right: 0.6 },
  E: { left: 0, right: -0.2 },
  F: { left: 0, right: -0.3 },
  G: { left: 0.1, right: 0.1 },
  H: { left: 0.1, right: -0.05 },
  I: { left: 0, right: -0.2 },
  J: { left: 1.6, right: -0.1 },
  K: { left: 0.1, right: 0.15 },
  L: { left: 0.2, right: 0.8 },
  M: { left: 0.1, right: -0.2 },
  N: { left: 0.1, right: -0.2 },
  O: { left: 0.1, right: 0 },
  Q: { left: 0.1, right: 0.1 },
  S: { left: 0.1, right: 0 },
  T: { left: 0, right: -0.2 },
  U: { left: 0, right: -0.2 },
  V: { left: 0.2, right: 0 },
  W: { left: 0, right: -0.2 },
  X: { left: 0.3, right: 0.05 },
  Y: { left: 0.3, right: 0.05 },
  Z: { left: 0, right: -0.2 },
};

if (document.location.hash !== "#embed") {
  $("#input").focus();
}

if (document.location.hash === "#embed") {
  $("#link-home").hide();
}
