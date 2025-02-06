import { promises as fs } from 'fs';
import path from 'path';

export async function readFile(filePath: string): Promise<string> {
  try {
    const absolutePath = path.resolve(__dirname, filePath);
    const data = await fs.readFile(absolutePath, 'utf-8');

    return data.trim();
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    throw new Error(`Could not read ${filePath}`);
  }
}
