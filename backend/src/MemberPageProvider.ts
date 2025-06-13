import { MongoClient, ObjectId, Collection } from 'mongodb';
import { IAPIMemberData } from './shared/DatabaseHelper';

export class MemberPageProvider {
  private memberCollection: Collection<any>;

  constructor(client: MongoClient) {
    const collectionName = process.env.MEMBERS_COLLECTION_NAME;
    if (!collectionName) {
      throw new Error("Missing MEMBERS_COLLECTION_NAME in env");
    }
    this.memberCollection = client.db().collection(collectionName);
  }

  async getAllMembers(): Promise<IAPIMemberData[]> {
    const rawData = await this.memberCollection.find().toArray();
    return rawData.map((doc: any) => ({
      _id: doc._id,
      id: doc._id.toString(),
      first_name: doc.first_name,
      middle_name: doc.middle_name,
      last_name: doc.last_name,
      src: doc.src,
      alt: doc.alt,
    }));
  }

  async addMember(data: Omit<IAPIMemberData, 'id'>): Promise<IAPIMemberData> {
    const result = await this.memberCollection.insertOne(data);
    return {
      ...data,
      id: result.insertedId.toString(),
    };
  }

  async deleteMemberById(id: string): Promise<void> {
    await this.memberCollection.deleteOne({ _id: new ObjectId(id) });
  }
}
