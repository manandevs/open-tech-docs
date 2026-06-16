import {docs} from "collections/server"
import {loader} from "fumadocs-core/source"

export const source = loader({
	baseUrl: "/docs",
	source: docs.toFumadocsSource(),
})

export function getPageMarkdownUrl(page: (typeof source)["$inferPage"]) {
	const segments = [...page.slugs, "content.md"]

	return {
		segments,
		url: `/docs/${segments.join("/")}`,
	}
}
