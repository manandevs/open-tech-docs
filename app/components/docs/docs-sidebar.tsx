import * as React from "react"
import {NavMain} from "~/components/docs/nav-main"
import {Sidebar, SidebarContent, SidebarHeader} from "~/components/ui/sidebar"
import {transformPageTreeToNavItems} from "~/lib/utils/sidebar-transformer"
import Logo from "../logo"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	pageTree: any
	currentPath: string
}

export function AppSidebar({pageTree, currentPath, ...props}: AppSidebarProps) {
	const navItems = React.useMemo(() => {
		if (!pageTree?.children) return []
		return transformPageTreeToNavItems(pageTree.children, currentPath)
	}, [pageTree, currentPath])

	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<Logo />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navItems} />
			</SidebarContent>
		</Sidebar>
	)
}
