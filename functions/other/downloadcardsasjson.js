const fs = require("fs");
const https = require("https");
const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
const storeData = (data, path) => {
    try {
      fs.writeFileSync(path, data);
    } catch (err) {
      console.error(err);
    }
  };

  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      storeData(body, `${__dirname + "/allcards.json"}`);
    });
  });