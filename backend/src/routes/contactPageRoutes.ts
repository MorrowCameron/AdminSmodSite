import { Express, Request, Response } from "express";
import { ContactPageProvider } from "../ContactPageProvider";
import { verifyAuthToken } from "../middleware/VerifyAuthToken";

export function registerContactRoutes(app: Express, provider: ContactPageProvider) {
  app.get("/api/contact/links", async (_req: Request, res: Response) => {
    try {
      const data = await provider.getAllContacts();
      res.json(data);
    } catch (err) {
      console.error("Failed to fetch contact links:", err);
      res.status(500).json({ error: "Failed to fetch contact links" });
    }
  });

  app.put("/api/contact/links/:name",
    verifyAuthToken,
    async (req: Request, res: Response) => {
      try {
        const { name } = req.params;
        const { link } = req.body;
        const result = await provider.updateContactByName(name, { link });

        if (result.matchedCount === 0 && !result.upsertedId) {
          res.status(404).json({ error: "Contact not found" });
          return;
        }

        res.sendStatus(200);
      } catch (err) {
        console.error("Failed to update contact link:", err);
        res.status(500).json({ error: "Failed to update contact link" });
      }
    });
}
