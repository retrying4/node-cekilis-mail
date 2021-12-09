const Karistir = (a) => a.sort(() => Math.random() - 0.5);

const Tarih = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var tarih =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return tarih;
};

const Guid = () => {
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const MailGonder = (kime, konu, mesaj) => {
  require("nodemailer")
    .createTransport(
      "smtps://XXXXXXXXXX%40gmail.com:XXXXXXXXXX@smtp.gmail.com"
    )
    .sendMail({
      from: "Çekiliş <XXXXXXXXXX@gmail.com>",
      to: kime,
      subject: konu,
      text: mesaj,
    });
};

let kisiler = require("fs").readFileSync("./kisiler.txt", "utf8");

kisiler = kisiler.trim().split("\n");
kisiler = kisiler.map((kisi) => {
  kisi = kisi.trim().split(":");
  return { ad: kisi[0], mail: kisi[1] };
});
kisiler = Karistir(kisiler);

// Kişinin kendine çıkması engellendi.
let mailKisileri = kisiler.slice(0);
mailKisileri.push(mailKisileri.shift());

let x = 1;
const konu = "Çekiliş - " + Tarih() + " - " + Guid();
for (let i in kisiler) {
  const mail = mailKisileri[i];
  const kisi = kisiler[i];
  // console.log(mail.mail, kisi.ad);
  setTimeout(() => {
    MailGonder(
      mail.mail,
      konu,
      "Yılbaşı çekilişinde hediye alacağınız kişi: " +
        kisi.ad +
        ". Hediye limiti maximum 150TL minimum 50TL'dir."
    );
  }, ++x * 15000);
}
