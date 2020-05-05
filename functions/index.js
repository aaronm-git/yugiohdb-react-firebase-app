const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const spawn = require("child-process-promise").spawn;
const path = require("path");
const os = require("os");
const fs = require("fs");
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

exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith("image/")) {
    return console.log("This is not an image.");
  }

  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (path.dirname(filePath) === "card_thumbnails") {
    return console.log("Already a Thumbnail.");
  }

  // Download file from bucket.
  const bucket = storage.bucket();
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
  };
  await bucket.file(filePath).download({
    destination: tempFilePath,
  });
  console.log("Image downloaded locally to", tempFilePath);
  // Generate a thumbnail using ImageMagick.
  await spawn("convert", [tempFilePath, "-thumbnail", "200x200>", tempFilePath]);
  console.log("Thumbnail created at", tempFilePath);
  // Set new file path
  const thumbFilePath = `card_thumbnails/${fileName}`;
  // Uploading the thumbnail.
  await bucket.upload(tempFilePath, {
    destination: thumbFilePath,
    metadata: metadata,
  });
  // Once the thumbnail has been uploaded delete the local file to free up disk space.
  return fs.unlinkSync(tempFilePath);
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
