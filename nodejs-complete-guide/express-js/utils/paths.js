import path from "path";
import { fileURLToPath } from "url";

// added this because __dirname and __filename are not available by default for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export { __dirname, __filename };
