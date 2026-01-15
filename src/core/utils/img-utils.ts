import * as FileSystem from "expo-file-system";
import RNFS from "react-native-fs";

export const uriToBlob = async (
  uri: string
): Promise<{
  uri: string;
  name: string;
  type: string;
} | null> => {
  try {
    // Check if the file exists
    const fileInfo = await FileSystem.getInfoAsync(uri);
    console.log(fileInfo);
    if (!fileInfo.exists) {
      console.error("File does not exist");
      return null;
    }

    // Determine the MIME type and filename
    const fileName = uri.split("/").pop() || "profile_image.jpg";
    const mimeType = getMimeType(fileName);

    // Return an object compatible with FormData
    return {
      uri: uri,
      name: fileName,
      type: mimeType,
    };
  } catch (error) {
    console.error("Error converting URI to Blob-like object:", error);
    return null;
  }
};

const getMimeType = (uri: string): string => {
  const extension = uri.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
};

const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export const convertToBase64 = async (uri: string) => {
  const base64 = await RNFS.readFile(uri, "base64");
  return base64; // plain base64, no prefix
};