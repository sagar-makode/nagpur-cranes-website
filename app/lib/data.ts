import fs from "fs";
import path from "path";

export function getCranesData() {
  const filePath = path.join(process.cwd(), "content", "cranes-data.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonData);
}

export function getBlogPosts() {
  const filePath = path.join(process.cwd(), "content", "blog-posts.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonData);
}
