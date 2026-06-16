import React from "react"
import {useLocation, useMatches, Link} from "react-router"
import NavActions from "./nav-actions"
import {SidebarTrigger} from "./ui/sidebar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./ui/breadcrumb"
import {Separator} from "./ui/separator"
import Logo from "./logo"

export default function Header() {
	const location = useLocation()
	const matches = useMatches()

	const isDocsRoute = location.pathname.startsWith("/docs")
	const pathSegments = location.pathname.split("/").filter(Boolean)

	const formatSegmentTitle = (slug: string) => {
		return slug
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")
	}

	return (
		<header className='flex h-16 items-center justify-between gap-2 border-b border-gray-200 bg-[#f5f5f5] px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 dark:border-neutral-800 dark:bg-[#1a1a1a]'>
			<div className='flex items-center gap-2'>
				{!isDocsRoute && <Logo />}

				{!isDocsRoute && (
					<div className='px-4'>
						<Link to={"/docs"} className='text-sm'>
							Documentation
						</Link>
					</div>
				)}

				{isDocsRoute && (
					<>
						<SidebarTrigger className='-ml-1' />
						<Separator
							orientation='vertical'
							className='mr-2 data-vertical:h-4 data-vertical:self-auto'
						/>

						{/* Automatically Generated Breadcrumbs */}
						{pathSegments.length > 0 && (
							<Breadcrumb>
								<BreadcrumbList>
									{pathSegments.map((segment, index) => {
										const isLast = index === pathSegments.length - 1
										const href = `/${pathSegments.slice(0, index + 1).join("/")}`
										const title = formatSegmentTitle(segment)

										return (
											<React.Fragment key={href}>
												{index > 0 && <BreadcrumbSeparator className='hidden md:block' />}
												<BreadcrumbItem className={!isLast ? "hidden md:block" : ""}>
													{isLast ? (
														<BreadcrumbPage>{title}</BreadcrumbPage>
													) : (
														<BreadcrumbLink asChild>
															<Link to={href}>{title}</Link>
														</BreadcrumbLink>
													)}
												</BreadcrumbItem>
											</React.Fragment>
										)
									})}
								</BreadcrumbList>
							</Breadcrumb>
						)}
					</>
				)}
			</div>

			<NavActions />
		</header>
	)
}
