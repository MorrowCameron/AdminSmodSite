// routes/homepageRoutes.ts
import { Express, Request, Response, RequestHandler } from "express";
import { HomePageProvider } from "../HomePageProvider";
import { verifyAuthToken,  } from "../middleware/VerifyAuthToken";
import { imageMiddlewareFactory, handleImageFileErrors } from "../middleware/imageUploadMiddleware";


export function registerHomeImageRoutes(app: Express, provider: HomePageProvider) {
  app.get("/api/home/images", async (_req: Request, res: Response) => {
    try {
      const images = await provider.getAllImages();
      res.json(images);
    } catch (err) {
      console.error("Error fetching images:", err);
      res.status(500).json({ error: "Failed to fetch images" });
    }
  });

}

export function registerHomeImageUploadRoutes(app: Express, provider: HomePageProvider) {
  const uploadImageHandler: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const alt = req.body.alt || "";

      // Ensure multer has stored the file
      if (!req.file || !req.file.filename) {
        res.status(400).json({ error: "No image file uploaded" });
        return;
      }

      const filePath = `${req.file.filename}`;

      const result = await provider.updateImageByName(name, { filePath, alt });

      if (result.matchedCount === 0) {
        res.status(404).json({ error: "Image not found" });
        return;
      }

      res.sendStatus(200);
    } catch (err) {
      console.error("Error updating image:", err);
      res.status(500).json({ error: "Failed to update image" });
    }
  };

  app.post(
    "/api/home/images/:name",
    verifyAuthToken,
    imageMiddlewareFactory.single("image"),
    handleImageFileErrors,
    uploadImageHandler
  );
}
export function registerHomeTextRoutes(app: Express, provider: HomePageProvider) {
  app.get("/api/home/texts", async (_req: Request, res: Response) => {
    try {
      const texts = await provider.getAllTexts();
      res.json(texts);
    } catch (err) {
      console.error("Error fetching texts:", err);
      res.status(500).json({ error: "Failed to fetch texts" });
    }
  });

  app.put("/api/home/texts", verifyAuthToken, async (req: Request, res: Response) => {
    try {
      const { aboutText, showTimeText, reviewTexts } = req.body;
      const result = await provider.updateTexts([
        { name: "about", value: aboutText },
        { name: "showTime", value: showTimeText },
        { name: "review1", value: reviewTexts[0] },
        { name: "review2", value: reviewTexts[1] },
        { name: "review3", value: reviewTexts[2] },
      ]);

      res.status(200).json({ updated: result });
    } catch (err) {
      console.error("Error updating texts:", err);
      res.status(500).json({ error: "Failed to update texts" });
    }
  });
}
