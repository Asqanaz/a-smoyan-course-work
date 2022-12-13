import React, { useRef, useState, useEffect } from "react"
import { Outlet, NavLink, Link } from "react-router-dom"
import { Modal } from "../../common/Modal"

export const Home = () => {
	const [dropOpen, setDropOpen] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	const dropRef = useRef()
	useEffect(() => {
		document.addEventListener("click", handleDocumentClicked)

		return () => document.removeEventListener("click", handleDocumentClicked)
	}, [])

	const handleDocumentClicked = e => {
		if (dropRef.current && dropRef.current.contains(e.target)) {
			setDropOpen(true)
		} else {
			setDropOpen(false)
		}
	}

	return (
		<div className="container bg-gray-400 h-1/2">
			<div className="w-full bg-blue-700">
				<ul className="list-none flex flex-row gap-5 items-center p-2">
					<li className="cursor-pointer text-xs">
						<NavLink to="/home/exercise">Խնդիր</NavLink>
					</li>
					<li className="cursor-pointer text-xs">
						<NavLink to="/home/tip-of-the-day">Օրվա խորհուրդներ</NavLink>
					</li>
					<li className="cursor-pointer text-xs">
						<NavLink to="/home/help-window">Օգնության պատուհան</NavLink>
					</li>
					<li
						className={`cursor-pointer text-xs ${dropOpen ? "drop-active" : ""} relative`}
						onClick={() => setDropOpen(!dropOpen)}
						ref={dropRef}
					>
						<span>Դասավորել</span>
						{dropOpen && (
							<ul
								className="bg-blue-700 flex-col flex justify-center items-center absolute p-2 gap-2 z-10"
								onClick={e => e.stopPropagation()}
							>
								<li>Հորիզոնական</li>
								<li>Հերթականությամբ</li>
							</ul>
						)}
					</li>
					<li className="cursor-pointer text-xs">
						<Link to="/home">Փակել բոլորը</Link>
					</li>
					<li className="cursor-pointer text-xs">
						<NavLink to="/home/author">Հեղինակ</NavLink>
					</li>
					<li className="cursor-pointer text-xs" onClick={() => setIsOpen(true)}>
						Ելք
					</li>
				</ul>
			</div>
			<main className="bg-white w-full h-full p-20 flex flex-row gap-10 relative">
				<Outlet />
				{isOpen && (
					<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
						<span>Դուք արդյոք ցանկանում եք դուրս գալ ծրագրից</span>
						<div className="w-full flex justify-around items-center">
							<Link to="/" state={{ from: location.pathname }} className="w-1/3">
								<button className="w-full text-white">Ok</button>
							</Link>
							<button className="w-1/3 text-white" onClick={() => setIsOpen(false)}>
								Cancel
							</button>
						</div>
					</Modal>
				)}
			</main>
		</div>
	)
}
