import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsPath = new URL("../config/docs.json", import.meta.url);
const docs = JSON.parse(fs.readFileSync(docsPath, "utf8"));

export const findRelevantDocs = (question) => {
  const q = (question || "").toLowerCase();
  const qWords = q.split(/\W+/).filter(Boolean);

  return docs.filter(doc => {
    const title = doc.title.toLowerCase();
    const content = doc.content.toLowerCase();

    // exact phrase match
    if (q.includes(title) || content.includes(q)) return true;

    // match when all title words are present in the question (handles "reset my password")
    const titleWords = title.split(/\s+/).filter(Boolean);
    if (titleWords.length && titleWords.every(w => q.includes(w))) return true;

    // fallback: match if any significant word from the question appears in title or content
    const significant = qWords.filter(w => w.length > 2);
    return significant.some(w => title.includes(w) || content.includes(w));
  });
};