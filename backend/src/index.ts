import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ValidRoutes } from "./shared/ValidRoutes";
import { connectMongo } from "./connectMongo";
import { registerAuthRoutes } from "./routes/authRoutes";
import { CredentialsProvider } from "./CredentialsProvider";
import { verifyAuthToken } from "./middleware/VerifyAuthToken";
import { HomePageProvider } from "./HomePageProvider";
import { registerHomeImageRoutes, registerHomeImageUploadRoutes, registerHomeTextRoutes } from "./routes/homePageRoutes";
import { registerContactRoutes } from "./routes/contactPageRoutes";
import { ContactPageProvider } from "./ContactPageProvider";
import { AlumniPageProvider } from "./AlumniPageProvider";
import { registerAlumniRoutes } from "./routes/alumniRoutes";
import { registerMemberRoutes } from "./routes/memberRoutes";
import { MemberPageProvider } from "./MemberPageProvider";

dotenv.config();

const mongoClient = connectMongo();
const credentialsProvider = new CredentialsProvider(mongoClient);
const homePageProvider = new HomePageProvider(mongoClient);
const contactPageProvider = new ContactPageProvider(mongoClient);
const alumniPageProvider = new AlumniPageProvider(mongoClient);
const memberPageProvider = new MemberPageProvider(mongoClient);

const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";
const IMAGE_UPLOAD_DIR = process.env.IMAGE_UPLOAD_DIR || "uploads";
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

const app = express();
app.locals.JWT_SECRET = JWT_SECRET;
app.use(express.json());

app.use(express.static(STATIC_DIR));
app.use("/uploads", express.static(IMAGE_UPLOAD_DIR));

app.use("/api/*", verifyAuthToken);

registerAuthRoutes(app, credentialsProvider);
registerHomeImageRoutes(app, homePageProvider);
registerHomeImageUploadRoutes(app, homePageProvider);
registerHomeTextRoutes(app, homePageProvider);
registerContactRoutes(app, contactPageProvider);
registerAlumniRoutes(app, alumniPageProvider);
registerMemberRoutes(app, memberPageProvider);

app.get("/api/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

// Fallback route to frontend app
app.get(Object.values(ValidRoutes), (req: Request, res: Response) => {
  res.sendFile("index.html", { root: STATIC_DIR });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
