const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();
const storage = admin.storage();
const cors = require("cors")({ origin: true });

class apiResponse {
  constructor(Success = false, Status = 200, Data = {}, Message = null) {
    this.Success = Success;
    this.Status = Status;
    this.Data = Data;
    this.Message = Message;
  }
}

// Functions
// ================================================================================
//
exports.verifyImgExists = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const httpResponse = new apiResponse();
    try {
      const { cardId } = req.body.data;
      console.log("Card ID:", cardId);
      let cardExists = await storage.bucket().file(`cards/${cardId}.jpg`).exists();
      if (!cardExists[0]) {
        console.log(`${cardId} Not Found.`);
        console.log(`Downloading ${cardId}...`);
        const attachmentUrl = `https://storage.googleapis.com/ygoprodeck.com/pics/${cardId}.jpg`;
        const ygoprodeckResponse = await fetch(attachmentUrl)
          .then((r) => r.buffer())
          .then((buf) => new Uint8Array(buf));
        const options = {
          metadata: {
            contentType: "image/jpeg",
          },
        };
        const file = storage.bucket().file(`cards/${cardId}.jpg`);
        console.log(`Uploadding ${cardId}...`);
        await file.save(ygoprodeckResponse, options);
        console.log("Done!");
        cardExists = await storage.bucket().file(`cards/${cardId}.jpg`).exists();
      } else console.log(`${cardId} Found!`);
      httpResponse.Success = true;
      httpResponse.Data = { exists: cardExists[0] };
    } catch (error) {
      console.error(error);
      httpResponse.Status = 500;
      httpResponse.Message = error.message;
      httpResponse.Data = error;
    }
    return res.status(httpResponse.Status).send({ data: httpResponse });
  });
});
//
// ================================================================================
// \Functions

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
