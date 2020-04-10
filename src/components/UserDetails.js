import React, { useState, useEffect } from "react";

function UserDetails(props) {
	const green = "green-600";
	const [user, setUser] = useState({
		username: "",
	});

	function handleSubmit(event) {
		event.preventDefault();
		localStorage.setItem("username", user.username);
		localStorage.setItem("deck", JSON.stringify([1, 2, 3, 4, 5, 6]));
		window.location.reload();
	}

	function handleChange({ target }) {
		const updatedUser = { ...user, [target.name]: target.value };
		setUser(updatedUser);
	}
	return (
		<div className="h-screen w-screen flex justify-center items-center absolute">
			<form
				className="text-center w-full md:w-3/4 relative rounded px-20 py-10 shadow-lg bg-cards max-w-6xl"
				onSubmit={handleSubmit}
				action=""
				id="user-form"
			>
				<div className="shadow-md">
					<h1 className={`text-3xl bold text-white bg-${green}`}>
						Screen Name:
					</h1>
					<input
						className={`w-full border-4 border-${green} p-2 text-xl`}
						type="text"
						name="username"
						onChange={handleChange}
						id="user-input"
					/>
				</div>
				<input
					className={`bg-${green} py-2 cursor-pointer px-16 text-xl bold text-white mt-6 shadow-md disabled:bg-green-300`}
					type="submit"
					value="Enter"
					disabled={user.username == ""}
					id="user-submit"
				/>
			</form>
		</div>
	);
}

export default UserDetails;
