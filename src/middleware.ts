import { defineMiddleware } from "astro:middleware";
import fs from "node:fs/promises";
import path from "node:path";
import {
	DYNAMIC_COLLECTION_ROOT,
	DYNAMIC_IMAGE_URL_PREFIX,
} from "@/utils/dynamic-images";

const mimeTypes: Record<string, string> = {
	".avif": "image/avif",
	".webp": "image/webp",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".svg": "image/svg+xml",
};

/**
 * 开发模式下为动态相对引用的图片提供访问：`/assets/images/dynamic/<相对路径>`
 * 映射到 `src/content/dynamic/<相对路径>`。构建产物中图片已复制到 `dist`，无需此中间件。
 */
export const onRequest: ReturnType<typeof defineMiddleware> = defineMiddleware(
	async (context, next) => {
		if (!import.meta.env.DEV) return next();
		const url = new URL(context.request.url);
		if (!url.pathname.startsWith(`${DYNAMIC_IMAGE_URL_PREFIX}/`)) return next();

		const relativePath = decodeURI(
			url.pathname.slice(DYNAMIC_IMAGE_URL_PREFIX.length + 1),
		);
		const filePath = path.join(
			process.cwd(),
			DYNAMIC_COLLECTION_ROOT,
			relativePath,
		);
		try {
			const data = await fs.readFile(filePath);
			return new Response(data, {
				headers: {
					"Content-Type":
						mimeTypes[path.extname(filePath).toLowerCase()] ||
						"application/octet-stream",
				},
			});
		} catch {
			return next();
		}
	},
);
