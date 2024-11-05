import { storage } from "../lib/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = async (file) => {
  try {
    const folder = "file";

    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB limit

    if (file.size > maxSizeInBytes) {
      throw new Error("File size exceeds the 5 MB limit.");
    }

    // Ensure the folder name has a trailing slash
    const folderPath = folder ? `${folder}/` : "";

    // Generate a unique filename with the same extension as the original file
    const filename = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const safeFilename = `${filename}.${fileExtension}`;

    // Create a reference to the file in the specified folder
    const storageRef = ref(storage, `${folderPath}${safeFilename}`);

    // Calculate file size
    const fileSize = file.size;

    // Prepare metadata
    const metadata = {
      contentType: file.type, // Set contentType based on the file's MIME type
      customMetadata: {
        originalName: file.name, // Use the original file name from the `file` object
        uploadTime: new Date().toISOString(), // Store the current time as upload time
        fileSize: `${fileSize} bytes`, // Store the file size
      },
    };

    // Upload the file to Firebase Storage with metadata
    const res = await uploadBytes(storageRef, file, metadata);

    // Get the full path of the uploaded file
    const path = res.metadata.fullPath;

    if (!path) {
      throw new Error("No path found");
    }

    // Generate and return the file's download URL
    const fileRef = ref(storage, path);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.log(error);
    throw new Error(error?.message);
  }
};
