/** This file contains the logic for the optimistic UI displayed when loading users. */

/** Optimistic UI for user's dashboard. */
const UsersDashboardOptimisticUi = () => {
	return (
		<div className="optimistic-ui">
			<div>
				{Array(4).fill(null).map(() => (
					<div></div>
				))}
			</div>
			<div>
				{Array(10).fill(null).map(() => (
					<div></div>
				))}
			</div>
			<div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default UsersDashboardOptimisticUi;
