import { Outlet } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardSideBar from "../../components/DashboardSideBar";
import "../../styles/DashboardLayout.scss";
import { useEffect, useState } from "react";
import { alert } from "../../utils/notificationsSystem";

const RootLayout = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	useEffect(() => {
		alert("This site uses cookies for analytics.");
	}, [])

	return (
		<div className="dashboard-layout">
			<DashboardHeader setIsMenuOpen={setIsMenuOpen} />
			<div>
				<aside data-open={isMenuOpen}>
					<DashboardSideBar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
				</aside>
				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default RootLayout;
