/** This file contains logic for rendering and controlling the user table pagination functionality */

import { Dispatch } from "react";
import { ReducerAction } from "../../types";
import "../styles/components/UserTablePagination.scss";
import getPagination from "../utils/getPagination";

const UserTablePagination = ({
	currentPage,
	totalPages,
	displayLimit,
	totalUsers,
	dispatch,
}: {
	currentPage: number;
	totalPages: number;
	totalUsers: number;
	displayLimit: number;
	dispatch: Dispatch<ReducerAction>;
}) => {
	// Some complex calculations going on here
	const changePage = (
		pageNumber: number | null,
		index: number,
		array: (null | number)[],
	) => {
		pageNumber
			? dispatch({
					type: "SET_CURRENT_PAGE",
					payload: pageNumber,
				})
			: dispatch({
					type: "SET_CURRENT_PAGE",
					payload:
						index === 4
							? Math.floor(
									(totalPages -
										(array[index - 1] as number)) /
										2,
								) + (currentPage as number)
							: Math.floor((array[index + 1] as number) / 2),
				});
	};

	const displayLimits = [10, 20, 30, 40, 50];

	return (
		<div className="table-pagination">
			<div>
				Showing{" "}
				<span>
					<button>
						{displayLimit}{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="20px"
							viewBox="0 -960 960 960"
							width="20px"
							fill="currentColor"
						>
							<path d="M480-333 240-573l51-51 189 189 189-189 51 51-240 240Z" />
						</svg>
					</button>
					<span>
						{displayLimits.map((number) => (
							<button
								onClick={() => (
									dispatch({
										type: "SET_DISPLAY_LIMIT",
										payload: number,
									}),
									dispatch({
										type: "SET_CURRENT_PAGE",
										payload: 1,
									})
								)}
								key={number}
							>
								{number}
							</button>
						))}
					</span>
				</span>{" "}
				out of {totalUsers}
			</div>
			<div>
				<button
					onClick={() =>
						currentPage > 1 &&
						dispatch({
							type: "SET_CURRENT_PAGE",
							payload: currentPage - 1,
						})
					}
					title="Previous page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="14px"
						viewBox="0 -960 960 960"
						width="14px"
						fill="#545f7d"
					>
						<path d="M384-96 0-480l384-384 68 68-316 316 316 316-68 68Z" />
					</svg>
				</button>
				{getPagination(totalPages, currentPage).map(
					(pageNumber, index, array) => (
						<button
							data-active={pageNumber === currentPage}
							onClick={() => changePage(pageNumber, index, array)}
							key={Math.random()}
						>
							{pageNumber ? pageNumber : "..."}
						</button>
					),
				)}
				<button
					onClick={() =>
						currentPage < totalPages &&
						dispatch({
							type: "SET_CURRENT_PAGE",
							payload: currentPage + 1,
						})
					}
					title="Next page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="14px"
						viewBox="0 -960 960 960"
						width="14px"
						fill="#545f7d"
					>
						<path d="m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z" />
					</svg>
				</button>
			</div>
		</div>
	);
};

export default UserTablePagination;
