import {Link} from "react-router"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "~/components/ui/collapsible"
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "~/components/ui/sidebar"
import {ChevronRightIcon} from "lucide-react"

// Import the shared NavItem type
import type {NavItem} from "~/lib/utils/sidebar-transformer"

// Recursive component for Level 1 Items
function SidebarMenuItemRecursive({item}: {item: NavItem}) {
	const hasSubItems = item.items && item.items.length > 0

	if (!hasSubItems) {
		return (
			<SidebarMenuItem>
				<SidebarMenuButton
					asChild
					isActive={item.isActive}
					tooltip={typeof item.title === "string" ? item.title : undefined}
				>
					<Link to={item.url}>
						{item.icon}
						<span className='text-nowrap'>{item.title}</span>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		)
	}

	return (
		<Collapsible key={item.url} asChild defaultOpen={item.isActive} className='group/collapsible'>
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton tooltip={typeof item.title === "string" ? item.title : undefined}>
						{item.icon}
						<span className='text-nowrap'>{item.title}</span>
						<ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{item.items?.map((subItem) => (
							<SidebarSubMenuItemRecursive key={subItem.url} item={subItem} />
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	)
}

// Recursive component for Level 2 and deeper subfolders/pages
function SidebarSubMenuItemRecursive({item}: {item: NavItem}) {
	const hasSubItems = item.items && item.items.length > 0

	if (!hasSubItems) {
		return (
			<SidebarMenuSubItem>
				<SidebarMenuSubButton asChild isActive={item.isActive}>
					<Link to={item.url}>
						<span className='text-nowrap'>{item.title}</span>
					</Link>
				</SidebarMenuSubButton>
			</SidebarMenuSubItem>
		)
	}

	return (
		<Collapsible asChild defaultOpen={item.isActive} className='group/sub-collapsible'>
			<SidebarMenuSubItem>
				<CollapsibleTrigger asChild>
					<SidebarMenuSubButton>
						<span className='text-nowrap'>{item.title}</span>
						<ChevronRightIcon className='ml-auto size-3 transition-transform duration-200 group-data-[state=open]/sub-collapsible:rotate-90' />
					</SidebarMenuSubButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub className='mr-0 pr-0'>
						{item.items?.map((subItem) => (
							<SidebarSubMenuItemRecursive key={subItem.url} item={subItem} />
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuSubItem>
		</Collapsible>
	)
}

export function NavMain({items}: {items: NavItem[]}) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Documentation</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItemRecursive key={item.url} item={item} />
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
