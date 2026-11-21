import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "../public");
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  ".html": "text/html; charset=UTF-8",
  ".css": "text/css; charset=UTF-8",
  ".js": "text/javascript; charset=UTF-8",
  ".json": "application/json; charset=UTF-8",
  ".webmanifest": "application/manifest+json; charset=UTF-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split("?")[0];
  if (reqPath === "/") reqPath = "/index.html";

  let filePath = path.join(PUBLIC_DIR, reqPath);
  let ext = path.extname(filePath).toLowerCase();

  // If path has no extension and is a friendly route, serve index.html for SPA routing
  if (!ext) {
    filePath = path.join(PUBLIC_DIR, "index.html");
    ext = ".html";
  }

  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Fallback to index.html for SEO/GEO friendly client-side paths
        fs.readFile(path.join(PUBLIC_DIR, "index.html"), (fallErr, fallContent) => {
          if (fallErr) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("404 Not Found");
          }
          res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
          res.end(fallContent, "utf-8");
        });
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
      }
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content, "utf-8");
  });
});

server.listen(PORT, () => {
  console.log(`🖨️ Directorate of Printing & Stationery Web Portal (NESFIC-D-39) running at http://localhost:${PORT}`);
});
