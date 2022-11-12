import { IncomingMessage, ServerResponse } from "http";
import path from "path";
import fs from "fs";

const MIME_TYPES: { [key: string]: string } = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  json: "application/json",
  xml: "application/xml",
};

export default function StaticServer(rootPath: string) {
  const root = path.normalize(path.resolve(rootPath));

  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ) => {
    const extension = path.extname(req.url as string).slice(1);

    const type = extension ? MIME_TYPES[extension] : MIME_TYPES.html;

    let fileName = req.url as string;
    if (fileName === "/") fileName = "index.html";
    else if (!extension) {
      try {
        fs.accessSync(path.join(root, req.url + ".html"), fs.constants.F_OK);
        fileName = req.url + ".html";
      } catch (e) {
        fileName = "index.html";
      }
    }
    const filePath = path.join(root, fileName);
    const isPathUnderRoot = path
      .normalize(path.resolve(filePath))
      .startsWith(root);

    if (!isPathUnderRoot) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("404: File not found");
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404: File not found");
      } else {
        res.writeHead(200, { "Content-Type": type });
        res.end(data);
      }
    });
    
    if (next) {
      await next();
    }
  };
}
