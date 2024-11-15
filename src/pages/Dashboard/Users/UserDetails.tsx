/** This file contains logic for the user details page */
import "../../../styles/components/UserDetails.scss";
import arrowBackIcon from "../../../assets/images/np_back_3007750_000000 1.svg";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "../../../utils/notificationsSystem";
import { User } from "../../../../types";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import changeUserStatus from "../../../utils/changeUserStatus";
import NotFound from "../../404";

const UserDetails = () => {
	const [user, setUser] = useState(useLoaderData() as User);

	user && (document.title = user.personalInfo.name);

	return user ? (
		<div className="user-details">
			<Link to="../users" className="back-btn">
				<img src={arrowBackIcon} alt="Back arrow" /> Back to users
			</Link>
			<div>
				<h1>User Details</h1>
				<div>
					{user.personalInfo.status !== "Blacklisted" &&
						user.personalInfo.status !== "Pending" && (
							<button
								onClick={() =>
									changeUserStatus(
										user.id,
										"Blacklisted",
										undefined,
										undefined,
										setUser,
									)
								}
								className="deactivate-user"
							>
								BLACKLIST USER
							</button>
						)}
					{user.personalInfo.status !== "Active" && (
						<button
							onClick={() =>
								changeUserStatus(
									user.id,
									"Active",
									undefined,
									undefined,
									setUser,
								)
							}
							className="activate-user"
						>
							ACTIVATE USER
						</button>
					)}
				</div>
			</div>
			<div>
				<div>
					<div>
						<div></div>
						<div>
							<h2>{user.personalInfo.name}</h2>
							<p>{user.id}</p>
						</div>
					</div>
					<span></span>
					<div>
						<p>User's Tier</p>
						<p>
							{Array(user.tier)
								.fill(null)
								.map(() => (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="20px"
										viewBox="0 -960 960 960"
										width="20px"
										fill="#D4AF37"
									>
										<path d="m243-144 63-266L96-589l276-24 108-251 108 252 276 23-210 179 63 266-237-141-237 141Z" />
									</svg>
								))}
							{Array(3 - user.tier)
								.fill(null)
								.map(() => (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="20px"
										viewBox="0 -960 960 960"
										width="20px"
										fill="#D4AF37"
									>
										<path d="m352-293 128-76 129 76-34-144 111-95-147-13-59-137-59 137-147 13 112 95-34 144ZM243-144l63-266L96-589l276-24 108-251 108 252 276 23-210 179 63 266-237-141-237 141Zm237-333Z" />
									</svg>
								))}
						</p>
					</div>
					<span></span>
					<div>
						<h2>₦{user.loanAmount.toLocaleString()}</h2>
						<p>
							{user.bankDetails.accountNumber}/
							{user.bankDetails.bankName}
						</p>
					</div>
				</div>
				<div>
					<button className="active">General Details</button>
					<button
						onClick={() =>
							toast.error("This feature is unavailable!")
						}
					>
						Documents
					</button>
					<button
						onClick={() =>
							toast.error("This feature is unavailable!")
						}
					>
						Bank Details
					</button>
					<button
						onClick={() =>
							toast.error("This feature is unavailable!")
						}
					>
						Loans
					</button>
					<button
						onClick={() =>
							toast.error("This feature is unavailable!")
						}
					>
						Savings
					</button>
					<button
						onClick={() =>
							toast.error("This feature is unavailable!")
						}
					>
						App and System
					</button>
				</div>
			</div>
			<div>
				<div className="info-section">
					<h3>Personal Information</h3>
					<div>
						<div>
							<div>FULL NAME</div>
							<div>{user.personalInfo.name}</div>
						</div>
						<div>
							<div>PHONE NUMBER</div>
							<div>{user.personalInfo.phoneNumber}</div>
						</div>
						<div>
							<div>EMAIL ADDRESS</div>
							<div>{user.personalInfo.email.toLowerCase()}</div>
						</div>
						<div>
							<div>BVN</div>
							<div>{user.bankDetails.bvn}</div>
						</div>
						<div>
							<div>GENDER</div>
							<div>{user.personalInfo.gender}</div>
						</div>
						<div>
							<div>MARITAL STATUS</div>
							<div>{user.personalInfo.maritalStatus}</div>
						</div>
						<div>
							<div>CHILDREN</div>
							<div>{user.personalInfo.children || "None"}</div>
						</div>
						<div>
							<div>TYPE OF RESIDENCE</div>
							<div>{faker.helpers.arrayElement([
									"Parent's house",
									"Hotel apartment",
									"Estate.",
									"Personal house",
								])}</div>
						</div>
					</div>
				</div>
				<hr />
				<div className="info-section">
					<h3>Education and Employment</h3>
					<div>
						<div>
							<div>LEVEL OF EDUCATION</div>
							<div>
								{faker.helpers.arrayElement([
									"LLB",
									"MBBS",
									"BSc.",
									"BA",
									"OND",
									"HND",
									"MSc.",
									"MA",
								])}
							</div>
						</div>
						<div>
							<div>EMPLOYMENT STATUS</div>
							<div>
								{user.educationAndEmployment.employmentStatus}
							</div>
						</div>
						<div>
							<div>SECTOR OF EMPLOYMENT</div>
							<div>
								{user.educationAndEmployment.employmentsector}
							</div>
						</div>
						<div>
							<div>DURATION OF EMPLOYMENT</div>
							<div>
								{user.educationAndEmployment.employmentDuration}{" "}
								years
							</div>
						</div>
						<div>
							<div>OFFICE EMAIL</div>
							<div>
								{user.educationAndEmployment.officeEmail.toLowerCase()}
							</div>
						</div>
						<div>
							<div>MONTHLY INCOME</div>
							<div>
								{user.educationAndEmployment.monthlyIncome}
							</div>
						</div>
						<div>
							<div>LOAN REPAYMENT</div>
							<div>
								₦
								{user.educationAndEmployment.loanRepayment.toLocaleString()}
							</div>
						</div>
					</div>
				</div>
				<hr />
				<div className="info-section">
					<h3>Socials</h3>
					<div>
						<div>
							<div>TWITTER</div>
							<div>{user.socials.twitter}</div>
						</div>
						<div>
							<div>FACEBOOK</div>
							<div>{user.socials.facebook}</div>
						</div>
						<div>
							<div>INSTAGRAM</div>
							<div>{user.socials.instagram}</div>
						</div>
					</div>
				</div>
				<hr />
				<div className="info-section">
					<h3>Guarantor</h3>
					<div>
						<div>
							<div>FULL NAME</div>
							<div>{user.guarantors[0].name}</div>
						</div>
						<div>
							<div>PHONE NUMBER</div>
							<div>{user.guarantors[0].phoneNumber}</div>
						</div>
						<div>
							<div>EMAIL ADDRESS</div>
							<div>{user.guarantors[0].email}</div>
						</div>
						<div>
							<div>RELATIONSHIP</div>
							<div>{user.guarantors[0].relationship}</div>
						</div>
					</div>
				</div>
				<hr />
				<div className="info-section">
					<div>
						<div>
							<div>FULL NAME</div>
							<div>{user.guarantors[1].name}</div>
						</div>
						<div>
							<div>PHONE NUMBER</div>
							<div>{user.guarantors[1].phoneNumber}</div>
						</div>
						<div>
							<div>EMAIL ADDRESS</div>
							<div>{user.guarantors[1].email}</div>
						</div>
						<div>
							<div>RELATIONSHIP</div>
							<div>{user.guarantors[1].relationship}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<NotFound />
	);
};

export default UserDetails;
