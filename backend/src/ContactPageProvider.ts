import { Collection, MongoClient } from "mongodb";
import { IAPIContactData } from "./shared/DatabaseHelper";

export class ContactPageProvider {
  private contactCollection: Collection<IAPIContactData>;

  constructor(mongoClient: MongoClient) {
    const collectionName = process.env.CONTACTPAGE_COLLECTION_NAME;
    if (!collectionName) {
      throw new Error("Missing CONTACTPAGE_COLLECTION_NAME in env");
    }
    this.contactCollection = mongoClient.db().collection(collectionName);
  }

  async getAllContacts(): Promise<IAPIContactData[]> {
    return this.contactCollection.find({}).toArray();
  }

  async updateContactByName(name: string, update: { link: string }) {
    return this.contactCollection.updateOne(
      { name },
      { $set: update },
      { upsert: true }
    );
  }
}
