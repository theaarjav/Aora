import { Account, Avatars, Client, Databases, Storage, Query } from 'react-native-appwrite';
import { ID } from 'react-native-appwrite';
export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.theaarjav.shaire",
    projectId: "6679d5b5003c4b77e971",
    databaseId: "6679d999000aaeb72066",
    userCollectionId: "6679d9d8000f7e238dd3",
    mediaCollectionId: "6679d9e90021e0543795",
    storageId: "6679e0af003547c4bc9c"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
    ;
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
export const createUser = async ({ email, password, username }) => {
    // Register User
    try {
        console.log("Email:", email, "password:", password, "Username:", username)
        const newAcc = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        console.log("New account created");
        if (!newAcc) throw Error;
        const newAvatar = avatars.getInitials(username);
        await signIn({ email, password });
        console.log("After signIn")
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAcc.$id,
                email: email,
                username: username,
                avatar: newAvatar
            }
        )


        return newUser;

    } catch (error) {
        console.log(error)
        throw new Error("Error in createUser", error)
    }
}

export const signIn = async ({ email, password }) => {
    try {
        // console.log(email, password)
        // await account.deleteSessions()
        const session = await account.createEmailPasswordSession(email, password);
        console.log("Session", session)
        return session
    } catch (error) {
        console.log(error);
        throw new Error("Error in sign in", error)
    }
}

export const getCurrUser = async () => {
    try {
        const currAcc = await account.get();
        if (!currAcc) throw Error;
        // console.log("currAcc", currAcc)
        const currUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currAcc.$id)]
        )
        console.log("CurrUser fetched", currUser);
        if (!currUser) throw Error;
        return currUser.documents[0];
    } catch (error) {
        console.log("Error in getCurrUser,", error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.mediaCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts?.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.mediaCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        );
        return posts?.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getSearchedPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.mediaCollectionId,
            [Query.search("title", query)]
        );
        return posts?.documents;
    } catch (error) {
        console.log("Error:", error)
        throw new Error(error);
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.mediaCollectionId,
            [Query.equal("maestro", userId), Query.orderDesc('$createdAt')]
        );
        return posts?.documents;
    } catch (error) {
        console.log("Error:", error)
        throw new Error(error);
    }
}

export async function uploadFile(file, type) {
    if (!file) return;

    // const { mimeType, ...rest } = file;
    const asset = { 
        name:file.fileName,
        type:file.mimeType,
        size:file.fileSize,
        uri:file.uri
        
     };

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getFilePreview(fileId, type) {
    let fileUrl;

    try {
        if (type === "video") {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId,
                fileId,
                2000,
                2000,
                "top",
                100
            );
        } else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export async function createVideoPost(form) {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video"),
        ]);

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.mediaCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                media: videoUrl,
                prompt: form.prompt,
                maestro: form.userId,
            }
        );

        return newPost;
    } catch (error) {
        throw new Error(error);
    }
}