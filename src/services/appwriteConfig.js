import { Client, Account } from "appwrite";

const client = new Client();
const account = new Account(client);

client
  .setEndpoint("https://139.59.47.227/v1")
  .setProject("63d97d1a58916ee1295b");

export default account;
