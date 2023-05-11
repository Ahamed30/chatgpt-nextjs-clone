import { db } from "./firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";

const getApiKey = async (userId: string) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc?.exists()) {
      const encryptedApiKey = userDoc?.data()?.encryptedApiKey;
      if (encryptedApiKey) {
        const bytes = CryptoJS?.AES?.decrypt(encryptedApiKey, "secret key");
        const apiKey = bytes?.toString(CryptoJS.enc.Utf8);
        return apiKey;
      }
    }
    return "";
  } catch (err) {
    console.error("Error", err);
  }
};

const saveApiKey = async (userId: string, apiKey: string) => {
  try {
    const encryptedApiKey = CryptoJS?.AES?.encrypt(
      apiKey,
      "secret key"
    ).toString();
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { encryptedApiKey });
  } catch (error) {
    console.error("Failed to store API key for user:", userId, error);
  }
};

const deleteApiKey = async (userId: string) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await deleteDoc(userDocRef);
  } catch (err) {
    console.error("Error", err);
  }
};

export { getApiKey, saveApiKey, deleteApiKey };
