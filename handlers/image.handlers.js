const storage = require("../utils/firebase.utils");
const {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} = require("firebase/storage");
const shortUUID = require("short-uuid");
const BUCKET_FOLDER_NAME = "PostCover";

function generateFilename() {
  return shortUUID.generate(); // Use shortUUID to generate a unique filename
}

exports.uploadImage = async (file) => {
  const randomFilename = generateFilename();
  const imageReference = ref(
    storage,
    `${BUCKET_FOLDER_NAME}/${randomFilename}-${file.originalname}`
  );
  const metatype = { contentType: file.mimetype, name: file.originalname };

  try {
    await uploadBytes(imageReference, file.buffer, metatype);
    const coverUrl = await getDownloadURL(imageReference);
    return { success: true, coverUrl };
  } catch (error) {
    console.error(error.message);
    return { success: false, error: error.message };
  }
};

exports.deleteFromUrl = async (url) => {
  const imageReference = ref(storage, url);
  return await deleteObject(imageReference).catch((err) => {
    return err;
  });
};

exports.updateImage = async (oldImageUrl, newFile) => {
  await this.deleteFromUrl(oldImageUrl);
  return await this.uploadImage(newFile);
};
