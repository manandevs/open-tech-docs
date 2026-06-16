import {source} from "~/lib/source"
import type {Route} from "./+types/search"
import {createFromSource} from "fumadocs-core/search/server"

const server = createFromSource(source, {
	language: "english",
})

export async function loader({request}: Route.LoaderArgs) {
	return server.GET(request)
}
