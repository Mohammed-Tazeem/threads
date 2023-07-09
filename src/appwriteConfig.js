import { Client, Databases } from 'appwrite';

const client = new Client();

const VITE_ID = import.meta.env.VITE_PROJECT_ID
const VITE_ENDPOINT = import.meta.env.VITE_ENDPOINT
const DB_ID = import.meta.env.DB_ID

client
    .setEndpoint(VITE_ENDPOINT)
    .setProject(VITE_ID);

export const database = new Databases(client)

export default client;