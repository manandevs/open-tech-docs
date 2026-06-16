import * as React from "react"
import type {source} from "~/lib/source"

export type PageTreeNode = (typeof source.pageTree)["children"][number]

export interface NavItem {
	title: React.ReactNode
	url: string
	icon?: React.ReactNode
	isActive?: boolean
	items?: NavItem[]
}

export function transformPageTreeToNavItems(nodes: PageTreeNode[], currentPath: string): NavItem[] {
	const result: NavItem[] = []

	for (const node of nodes) {
		if (node.type === "folder") {
			const hasChildren = node.children && node.children.length > 0
			const isChildActive = node.children.some(
				(child) => child.type === "page" && child.url === currentPath,
			)

			result.push({
				title: node.name,
				url: node.index?.url || "#",
				isActive: isChildActive,
				items: hasChildren
					? transformPageTreeToNavItems(node.children as PageTreeNode[], currentPath)
					: undefined,
			})
		} else if (node.type === "page") {
			result.push({
				title: node.name,
				url: node.url,
				isActive: node.url === currentPath,
			})
		}
	}

	return result
}
