import {useNavigate} from "react-router"
import ThemeSwitcher from "./theme-switcher"
import {Button} from "./ui/button"

export default function NavActions() {
	const navigate = useNavigate()
	return (
		<div className='flex items-center space-x-2'>
			<Button
				size={"lg"}
				onClick={() => {
					navigate("/docs")
				}}
			>
				Get Started
			</Button>

			<ThemeSwitcher />

			<Button
				asChild
				size={"icon-sm"}
				variant={"ghost"}
				aria-label='Open GitHub'
				title='Open project on GitHub'
				className='rounded-full bg-white p-0.5 shadow'
			>
				<img
					src='/icons/git-hub.png'
					alt='GitHub'
					className='aspect-square object-cover object-center hover:cursor-not-allowed'
				/>
			</Button>
		</div>
	)
}
