// src/AlumniPageProvider.ts
import { Collection, MongoClient } from "mongodb";
import { IAPIAlumniData } from "./shared/DatabaseHelper";

export class AlumniPageProvider {
  private alumniCollection: Collection<IAPIAlumniData>;

  constructor(private readonly mongoClient: MongoClient) {
    const collectionName = process.env.ALUMNI_COLLECTION_NAME;
    if (!collectionName) {
      throw new Error("Missing ALUMNI_COLLECTION_NAME from environment variables");
    }
    this.alumniCollection = this.mongoClient.db().collection<IAPIAlumniData>(collectionName);
  }

  async getAllAlumni(): Promise<IAPIAlumniData[]> {
    const alumni = await this.alumniCollection.find({}).toArray();
    return alumni.map(({ _id, ...rest }) => ({ _id, ...rest }));
  }

  async saveAlumniList(alumniList: { first_name: string, last_name: string }[]): Promise<void> {
    // Clear existing alumni data and replace with new list
    await this.alumniCollection.deleteMany({});
    await this.alumniCollection.insertMany(
      alumniList.map((alumnus) => ({
        id: crypto.randomUUID(), // or let Mongo generate _id
        first_name: alumnus.first_name,
        last_name: alumnus.last_name,
      }))
    );
  }
}
