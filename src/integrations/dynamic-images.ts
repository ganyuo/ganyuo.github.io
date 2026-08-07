import type { Dirent } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import {
	DYNAMIC_COLLECTION_ROOT,
	DYNAMIC_IMAGE_URL_PREFIX,
} from "../utils/dynamic-images";

async function listFilesRecursive(dir: string): Promise<string[]> {
	let entries: Dirent[];
	try {
		entries = await fs.readdir(dir, { withFileTypes: true });
	} catch {
		return [];
	}
	const files = await Promise.all(
		entries.map((entry) => {
			const fullPath = path.join(dir, entry.name);
			return entry.isDirectory() ? listFilesRecursive(fullPath) : [fullPath];
		}),
	);
	return files.flat();
}

/**
 * 将 `src/content/dynamic` 下非 md/mdx 文件（动态正文中相对路径引用的图片）
 * 在构建结束后复制到 `dist/assets/images/dynamic/`，使相对引用的图片在静态站点中可用。
 */
export function dynamicImages(): AstroIntegration {
	return {
		name: "dynamic-images",
		hooks: {
			async "astro:build:done"({ dir }) {
				const sourceDir = path.join(process.cwd(), DYNAMIC_COLLECTION_ROOT);
				const outputDir = path.join(
					fileURLToPath(dir),
					DYNAMIC_IMAGE_URL_PREFIX.replace(/^\//, ""),
				);
				const files = await listFilesRecursive(sourceDir);
				for (const file of files) {
					if (/\.(md|mdx|markdown)$/i.test(file)) continue;
					const relativePath = path.relative(sourceDir, file);
					const target = path.join(outputDir, relativePath);
					await fs.mkdir(path.dirname(target), { recursive: true });
					await fs.copyFile(file, target);
				}
			},
		},
	};
}
