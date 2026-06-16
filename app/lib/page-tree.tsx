import {FileTextIcon, FolderIcon} from "lucide-react"
import type {source} from "./source"

export type PageTreeNode = (typeof source.pageTree)["children"][number]

function transformPageTreeToNavItems(nodes: PageTreeNode[], currentPath: string): any[] {
	return nodes
		.map((node) => {
			// 1. Map Folders/Categories
			if (node.type === "folder") {
				const hasChildren = node.children && node.children.length > 0

				const isChildActive = node.children.some(
					(child) => child.type === "page" && child.url === currentPath,
				)

				return {
					title: node.name,
					url: node.index?.url || "#",
					isActive: isChildActive,
					items: hasChildren ? transformPageTreeToNavItems(node.children, currentPath) : undefined,
				}
			}

			// 2. Map Standard Pages
			if (node.type === "page") {
				return {
					title: node.name,
					url: node.url,
					isActive: node.url === currentPath,
				}
			}

			return null
		})
		.filter(Boolean)
}
