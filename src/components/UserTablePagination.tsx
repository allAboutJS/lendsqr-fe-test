/** This file contains logic for rendering and controlling the user table pagination functionality */

import { Dispatch } from "react";
import { ReducerAction } from "../../types";
import "../styles/components/UserTablePagination.scss";

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
	const getPagination = (
		totalPages: number,
		currentPage: number,
	): (number | null)[] => {
		return Array.from(
			{ length: totalPages <= 6 ? totalPages : 6 },
			(_, index) => {
				if (index === 0) return 1;
				if (index === 5) return totalPages;

				const isMidRange =
					currentPage > 1 + 3 && currentPage < totalPages - 3;
				const isNearRange = currentPage <= 1 + 3;
				const isFarRange = currentPage >= totalPages - 3;

				if (isMidRange) {
					if (index === 1) return null;
					if (index === 4) return null;
					if (index === 2) return currentPage;
					if (index === 3) return currentPage + 1;
				}

				if (isNearRange) {
					if (index === 4) return null;
					return index + 1;
				}

				if (isFarRange) {
					if (currentPage === totalPages) {
						if (index === 4) return currentPage - 1;
						if (index === 3) return currentPage - 2;
						if (index === 2) return currentPage - 3;
						if (index === 1) return null;
					} else {
						if (index === 4) return totalPages - 1;
						if (index === 3) return totalPages - 2;
						if (index === 2) return totalPages - 3;
						if (index === 1) return null;
					}
				}

				return null;
			},
		);
	};

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

	return (
		<div className="table-pagination">
			<div>
				Showing {displayLimit} out of {totalUsers}
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
