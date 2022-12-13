import React from "react"
import { Link } from "react-router-dom"

export const Modal = ({ setIsOpen, children }) => {
	return (
		<div
			className="w-full h-full absolute top-0 left-0 backdrop-blur-sm flex justify-center items-center z-0"
			onClick={() => setIsOpen(false)}
		>
			<div
				className="w-[435px] h-1/2 p-6 flex flex-col justify-center items-center bg-gray-600 z-50 rounded-2xl gap-16"
				onClick={e => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}
