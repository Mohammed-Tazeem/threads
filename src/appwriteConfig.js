import { Client, Databases } from 'appwrite';

const client = new Client();

const PROJECT_ID = import.meta.env.VITE_PROJECT_ID
const VITE_ENDPOINT = import.meta.env.VITE_ENDPOINT
const DEV_DB_ID = import.meta.env.VITE_DB_ID
const COLLECTION_ID_THREADS = import.meta.env.VITE_COLLECTION_ID_THREADS

client
    .setEndpoint(VITE_ENDPOINT)
    .setProject(PROJECT__ID);

export const database = new Databases(client)

export default client;