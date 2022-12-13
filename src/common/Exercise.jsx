import React, { useState } from "react"
import { useEffect } from "react"
import { Modal } from "./Modal"

export const Exercise = () => {
	const [isOpen, setIsOpen] = useState()
	const [text, setText] = useState("")
	const [message, setMessage] = useState("")
	let [row, setRow] = useState()
	let [column, setColumn] = useState()
	const [initArr, setInitArr] = useState()
	const [resArr, setResArr] = useState()
	const [maxEl, setMaxEl] = useState()

	useEffect(() => {
		fetch("/exercise.txt")
			.then(res => res.text())
			.then(text => setText(text))
	}, [])
	function deletingMaxElement(arr) {
		let newArr = []
		let maxOfRow = []
		for (let i = 0; i < arr.length; i++) {
			newArr[i] = [...arr[i]]
			for (let j = 0; j < arr[i].length; j++) {
				newArr[i][j] = arr[i][j]
			}
			maxOfRow = [...maxOfRow, Math.max(...newArr[i])]
		}
		let maxOfArr = Math.max(...maxOfRow)

		setMaxEl(maxOfArr)

		for (let i = 0; i < newArr.length; i++) {
			for (let j = 0; j < newArr[i].length; j++) {
				if (newArr[i][j] === maxOfArr) {
					for (let l = 0; l < newArr.length; l++) {
						delete newArr[l][j]
						for (let p = 0; p < newArr[i].length; p++) {
							delete newArr[i][p]
						}
					}
				}
			}
		}

		return newArr
	}
	const runTask = () => {
		if (!row || !column) {
			setMessage("Input fields are empty")
		} else {
			setMessage("")
			let arr = []
			for (let i = 0; i < row; i++) {
				arr[i] = []
				for (let j = 0; j < column; j++) {
					arr[i][j] = Math.round(Math.random() * 1000)
				}
			}
			setInitArr(arr)
			setResArr(deletingMaxElement(arr))
		}
	}
	return (
		<div className="flex flex-row justify-between w-full">
			<div className="flex flex-col gap-10">
				<input type="number" placeholder="Row" value={row} onChange={e => setRow(e.target.value)} />
				<input type="number" placeholder="Column" value={column} onChange={e => setColumn(e.target.value)} />
				<button className="text-white" onClick={runTask}>
					Submit
				</button>

				<button className="text-white" onClick={() => setIsOpen(true)}>
					Խնդրի պահանջ
				</button>
				{isOpen && (
					<Modal setIsOpen={setIsOpen}>
						<p className="text-white">{text}</p>
					</Modal>
				)}
				{maxEl && <span>Max element of matrix: {maxEl}</span>}
				<p className="text-red-600">{message}</p>
			</div>
			<div className="flex flex-row justify-around items-center w-full">
				{initArr && (
					<div className="flex flex-col justify-center items-center gap-5">
						<span>Նախնական մատրից</span>
						<table border="1">
							<tbody>
								{initArr.map(row => (
									<tr>
										{row.map(col => (
											<td>{col}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				{resArr && (
					<div className="flex flex-col justify-center items-center gap-5">
						<span>Վերջնական մատրից</span>
						<table border="1">
							<tbody>
								{resArr.map(row => (
									<tr>
										{row.map(col => (
											<td>{col}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	)
}
