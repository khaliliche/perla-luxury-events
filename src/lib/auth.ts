import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "fallback-secret";

export function checkPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export function createSessionToken(): string {
  return jwt.sign({ role: "admin" }, SECRET, { expiresIn: "7d" });
}

export function verifySessionToken(token: string): boolean {
  try {
    jwt.verify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}