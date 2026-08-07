import path from "node:path";

export const DYNAMIC_IMAGE_URL_PREFIX = "/assets/images/dynamic";

export const DYNAMIC_COLLECTION_ROOT = "src/content/dynamic";

export function isAbsoluteOrRemoteImageSrc(src: string): boolean {
	return (
		src.startsWith("http://") ||
		src.startsWith("https://") ||
		src.startsWith("//") ||
		src.startsWith("data:") ||
		src.startsWith("/")
	);
}

/**
 * 将动态正文中相对路径引用的图片解析为站点内绝对 URL。
 *
 * 相对路径以 md 文件所在目录为基准解析，得到的文件最终会以同样的相对结构
 * 出现在 `/assets/images/dynamic/` 下（构建时由 `dynamicImages` 集成复制）。
 * 解析后超出 `src/content/dynamic` 根目录的引用保持原样返回。
 */
export function resolveDynamicImageUrl(filePath: string, src: string): string {
	if (isAbsoluteOrRemoteImageSrc(src)) return src;
	const baseDir = path.posix.dirname(filePath || "");
	const resolved = path.posix.normalize(
		path.posix.join(baseDir, decodeURI(src)),
	);
	if (!resolved.startsWith(`${DYNAMIC_COLLECTION_ROOT}/`)) return src;
	const relativePath = resolved.slice(DYNAMIC_COLLECTION_ROOT.length + 1);
	return `${DYNAMIC_IMAGE_URL_PREFIX}/${encodeURI(relativePath)}`;
}
