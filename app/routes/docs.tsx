import type {ReactNode} from "react"
import type {Route} from "./+types/docs"
import {Link, useLocation} from "react-router"
import {findNeighbour} from "fumadocs-core/page-tree"
import browserCollections from "collections/browser"
import {useMDXComponents} from "~/components/docs/mdx"
import {useFumadocsLoader} from "fumadocs-core/source/client"
import {source} from "~/lib/source"

import Header from "~/components/header"
import {SidebarInset, SidebarProvider} from "~/components/ui/sidebar"
import {Button} from "~/components/ui/button"
import {ArrowLeft, ArrowRight} from "lucide-react"
import {AppSidebar} from "~/components/docs/docs-sidebar"
import {DocsTableOfContents} from "~/components/docs/docs-toc"

export async function loader({params}: Route.LoaderArgs) {
	const slugs = params["*"]?.split("/").filter((v) => v.length > 0) || []
	const page = source.getPage(slugs)

	if (!page) {
		throw new Response("Not found", {
			status: 404,
		})
	}

	const pageTree = await source.serializePageTree(source.getPageTree())
	const neighbours = findNeighbour(source.getPageTree(), page.url)

	return {
		path: page.path,
		url: page.url,
		title: page.data.title,
		description: page.data.description,
		toc: page.data.toc || [],
		pageTree,
		neighbours: {
			previous: neighbours.previous
				? {
						name: neighbours.previous.name,
						url: neighbours.previous.url,
					}
				: null,
			next: neighbours.next
				? {
						name: neighbours.next.name,
						url: neighbours.next.url,
					}
				: null,
		},
	}
}

export function meta({data}: Route.MetaArgs) {
	if (!data) return [{title: "Docs"}]

	return [
		{title: data.title},
		{
			name: "description",
			content: data.description,
		},
		{
			property: "og:title",
			content: data.title,
		},
		{
			property: "og:description",
			content: data.description,
		},
		{
			name: "twitter:title",
			content: data.title,
		},
		{
			name: "twitter:description",
			content: data.description,
		},
	]
}

const clientLoader = browserCollections.docs.createClientLoader({
	component({default: Mdx}, props?: {className: string}) {
		return <Mdx components={useMDXComponents()} />
	},
})

export default function Page({loaderData}: Route.ComponentProps) {
	const {path, pageTree, title, description, toc, neighbours} = useFumadocsLoader(loaderData)
	const location = useLocation()

	return (
		<SidebarProvider>
			<AppSidebar pageTree={pageTree} currentPath={location.pathname} />
			<SidebarInset>
				<Header />
				<div className='flex flex-1 flex-col px-4 py-6 [--sidebar-width:240px] md:px-8 lg:grid lg:grid-cols-[1fr_var(--sidebar-width)] lg:gap-8'>
					{/* Main Content Area */}
					<div className='min-w-0 flex-1'>
						<div className='mx-auto max-w-3xl py-6'>
							<div className='mb-6 flex flex-col gap-2'>
								<h1 className='text-3xl font-semibold tracking-tight'>{title}</h1>
								{description && <p className='text-base text-muted-foreground'>{description}</p>}
							</div>

							<div className='dark:prose-invert prose max-w-none'>
								{clientLoader.useContent(path)}
							</div>

							{/* Navigation Pagination */}
							<div className='mt-12 flex items-center justify-between border-t pt-6'>
								{neighbours.previous ? (
									<Button variant='outline' asChild>
										<Link to={neighbours.previous.url} className='flex items-center gap-2'>
											<ArrowLeft className='size-4' />
											<span>{neighbours.previous.name as string}</span>
										</Link>
									</Button>
								) : (
									<span />
								)}

								{neighbours.next ? (
									<Button variant='outline' asChild>
										<Link to={neighbours.next.url} className='flex items-center gap-2'>
											<span>{neighbours.next.name as string}</span>
											<ArrowRight className='size-4' />
										</Link>
									</Button>
								) : (
									<span />
								)}
							</div>
						</div>
					</div>

					{/* Table of Contents Column */}
					{toc?.length ? (
						<div className='no-scrollbar flex flex-col gap-8 overflow-y-auto px-8'>
							<DocsTableOfContents toc={toc as {title?: ReactNode; url: string; depth: number}[]} />
						</div>
					) : null}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
