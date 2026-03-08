import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

const PORTFOLIO_DOC_PATH = 'site/portfolio';

/**
 * Fetches the entire portfolio array from Firestore.
 */
export const fetchPortfolioData = async () => {
    try {
        const docRef = doc(db, PORTFOLIO_DOC_PATH);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().sections || [];
        } else {
            return null; // Signals that we should use the default sections
        }
    } catch (error) {
        console.error("Error fetching portfolio data:", error);
        throw error;
    }
};

/**
 * Fetches data for a specific section (hero, reviews, photobooth)
 */
export const fetchSectionData = async (sectionId) => {
    try {
        const docRef = doc(db, `site/${sectionId}`);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data().content : null;
    } catch (error) {
        console.error(`Error fetching ${sectionId} data:`, error);
        throw error;
    }
};

/**
 * Overwrites the entire portfolio array in Firestore.
 */
export const savePortfolioData = async (sectionsArray) => {
    try {
        const docRef = doc(db, PORTFOLIO_DOC_PATH);
        await setDoc(docRef, { sections: sectionsArray }, { merge: true });
    } catch (error) {
        console.error("Error saving portfolio data:", error);
        throw error;
    }
};

/**
 * Saves data for a specific section (hero, reviews, photobooth)
 */
export const saveSectionData = async (sectionId, data) => {
    try {
        const docRef = doc(db, `site/${sectionId}`);
        await setDoc(docRef, { content: data }, { merge: true });
    } catch (error) {
        console.error(`Error saving ${sectionId} data:`, error);
        throw error;
    }
};

/**
 * Uploads a physical File to Firebase Storage and returns its download URL.
 * Designed to handle both main images and gallery images.
 */
export const uploadImage = async (file, pathPrefix = 'portfolio') => {
    try {
        // Create a unique file name
        const uniqueFileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `${pathPrefix}/${uniqueFileName}`);

        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};
