/** Helper function for generating pagination data */
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

export default getPagination;
