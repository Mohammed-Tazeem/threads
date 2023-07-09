import { Client, Databases } from 'appwrite';

const client = new Client();


//export const VITE_ENDPOINT = prenv.VITE_ENDPOINT
//export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID
//export const DEV_DB_ID = import.meta.env.VITE_DB_ID
//export const COLLECTION_ID_THREADS = import.meta.env.VITE_COLLECTION_ID_THREADS

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64aa595e02c0030c16ae');

export const database = new Databases(client)

export default client;