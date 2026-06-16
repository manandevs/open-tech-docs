"use client"

import {useEffect, useState} from "react"
import "~/styles/theme-switch.css"

const ThemeSwitcher = () => {
	const [dark, setDark] = useState<boolean>(false)

	useEffect(() => {
		try {
			const stored = localStorage.getItem("theme")
			if (stored === "dark") setDark(true)
			else if (stored === "light") setDark(false)
			else {
				const prefersDark =
					window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
				setDark(prefersDark)
			}
		} catch (e) {
			// ignore
		}
	}, [])

	useEffect(() => {
		try {
			const el = document.documentElement
			if (dark) {
				el.classList.add("dark")
				localStorage.setItem("theme", "dark")
			} else {
				el.classList.remove("dark")
				localStorage.setItem("theme", "light")
			}
		} catch (e) {
			// ignore
		}
	}, [dark])

	const onToggle = () => setDark((d) => !d)

	return (
		<div className='scale-80'>
			<label className='switch'>
				<input id='input' type='checkbox' checked={dark} onChange={onToggle} />
				<div className='slider round'>
					<div className='sun-moon'>
						<svg id='moon-dot-1' className='moon-dot' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='50'></circle>
						</svg>
						<svg id='moon-dot-2' className='moon-dot' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='50'></circle>
						</svg>
						<svg id='moon-dot-3' className='moon-dot' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='50'></circle>
						</svg>
						<svg id='light-ray-1' className='light-ray' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='50'></circle>
						</svg>
						<svg id='light-ray-2' className='light-ray' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='50'></circle>
						</svg>
						<svg id='light-ray-3' className='light-ray' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='50'></circle>
						</svg>

						<svg id='cloud-1' className='cloud-dark' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='50'></circle>
						</svg>
						<svg id='cloud-2' className='cloud-dark' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='50'></circle>
						</svg>
						<svg id='cloud-3' className='cloud-dark' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='50'></circle>
						</svg>
						<svg id='cloud-4' className='cloud-light' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='50'></circle>
						</svg>
						<svg id='cloud-5' className='cloud-light' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='50'></circle>
						</svg>
						<svg id='cloud-6' className='cloud-light' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='50'></circle>
						</svg>
					</div>
					<div className='stars'>
						<svg id='star-1' className='star' viewBox='0 0 20 20'>
							<path d='M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z'></path>
						</svg>
						<svg id='star-2' className='star' viewBox='0 0 20 20'>
							<path d='M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z'></path>
						</svg>
						<svg id='star-3' className='star' viewBox='0 0 20 20'>
							<path d='M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z'></path>
						</svg>
						<svg id='star-4' className='star' viewBox='0 0 20 20'>
							<path d='M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z'></path>
						</svg>
					</div>
				</div>
			</label>
		</div>
	)
}

export default ThemeSwitcher
