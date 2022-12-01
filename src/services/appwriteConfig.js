import { Client, Account } from "appwrite";
const client = new Client();
const account = new Account(client);

client.setEndpoint("http://localhost:81/v1").setProject("638670d7ea1a52d6db09");

export default account;
