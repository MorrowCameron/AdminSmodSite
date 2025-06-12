import { Express, Request, Response } from "express";
import { AlumniPageProvider } from "../AlumniPageProvider";
import { verifyAuthToken } from "../middleware/VerifyAuthToken";

export function registerAlumniRoutes(app: Express, provider: AlumniPageProvider) {
  app.get("/api/alumni", async (_req: Request, res: Response) => {
    try {
      const alumni = await provider.getAllAlumni();
      res.json(alumni);
    } catch (err) {
      console.error("Failed to fetch alumni:", err);
      res.status(500).json({ error: "Failed to load alumni list" });
    }
  });

  app.post("/api/alumni", async (req: Request, res: Response) => {
    try {
      const alumniList = req.body;
      if (!Array.isArray(alumniList)) {
        res.status(400).json({ error: "Invalid alumni list" });
        return;
      }

      await provider.saveAlumniList(alumniList);
      res.sendStatus(200);
    } catch (err) {
      console.error("Failed to save alumni:", err);
      res.status(500).json({ error: "Failed to save alumni list" });
    }
  });
}
