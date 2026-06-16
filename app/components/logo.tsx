import React from "react"
import {useSidebar} from "./ui/sidebar"
import {Link} from "react-router"

const Logo = () => {
	const {state} = useSidebar()
	const isCollapsed = state === "collapsed"

	return (
		<Link to={"/"} className='flex items-center gap-3 transition-all duration-200'>
			<img
				src='/favicon.ico'
				alt='Logo'
				className='size-8 shrink-0 object-contain transition-transform duration-200 lg:size-10'
			/>

			<div
				className={`flex origin-left flex-col transition-all duration-200 ${
					isCollapsed
						? "pointer-events-none hidden w-0 scale-95 opacity-0"
						: "flex w-auto scale-100 opacity-100"
				}`}
			>
				<span className='text-xl font-medium whitespace-nowrap'>
					OpenTech
					<span className='pl-1 text-xs font-normal opacity-50'>Docs</span>
				</span>
				<span className='flex items-center justify-between gap-2 whitespace-nowrap'>
					<span className='text-xs opacity-50'>Guides</span>
					<span className='rounded bg-sidebar-accent px-1.5 py-0.5  text-[10px] text-sidebar-accent-foreground'>
						v1.0
					</span>
				</span>
			</div>
		</Link>
	)
}

export default Logo
