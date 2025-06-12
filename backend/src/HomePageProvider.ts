import { Collection, MongoClient} from "mongodb";
import { IAPIImageData, IAPITextData } from "./shared/DatabaseHelper";

export class HomePageProvider {
  private imageCollection: Collection<IAPIImageData>;
  private textCollection: Collection<IAPITextData>;

  constructor(private readonly mongoClient: MongoClient) {
    const imageCollectionName = process.env.HOMEPAGEPHOTOS_COLLECTION_NAME;
    const textCollectionName = process.env.HOMEPAGETEXT_COLLECTION_NAME;
    if (!imageCollectionName) {
      throw new Error("Missing HOMEPAGEPHOTOS_COLLECTION_NAME from environment variables");
    }
    if (!textCollectionName) {
      throw new Error("Missing HOMEPAGETEXT_COLLECTION_NAME from environment variables");
    }
    this.imageCollection = this.mongoClient.db().collection(imageCollectionName);
    this.textCollection = this.mongoClient.db().collection(textCollectionName);
  }

  async getAllImages(): Promise<IAPIImageData[]> {
    const results = await this.imageCollection.find().toArray();

    // Map MongoDB _id to string 'id' and remove _id field
    return results.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name,
      src: doc.src,
      alt: doc.alt ?? undefined
    }));
  }

  async updateImageByName(name: string, data: { filePath?: string; alt?: string }) {
    const updateFields: any = {};
    if (data.filePath) {
      updateFields.src = `/uploads/${data.filePath}`;
    }
    if (data.alt !== undefined) {
      updateFields.alt = data.alt;
    }
  
    return await this.imageCollection.updateOne(
      { name },
      { $set: updateFields }
    );
  }
  
  async updateTexts(texts: { name: string; value: string }[]): Promise<any> {
    const bulkOps = texts.map(({ name, value }) => ({
      updateOne: {
        filter: { name },
        update: { $set: { value } },
        upsert: true, // Create if not exists
      },
    }));
  
    const result = await this.textCollection.bulkWrite(bulkOps);
    return result;
  }

  async getAllTexts(): Promise<IAPITextData[]> {
    const results = await this.textCollection.find().toArray();

    return results.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name,
      value: doc.value
    }));
  }

}
