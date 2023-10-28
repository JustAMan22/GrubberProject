// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { searchRestaurants, getAllRestaurants } from "../../store/restaurants";

// function SearchBar() {
// 	const [searchQuery, setSearchQuery] = useState("");
// 	const dispatch = useDispatch();
// 	const history = useHistory();

// 	const handleSearch = async () => {
// 		history.push("/");
// 		await dispatch(searchRestaurants(searchQuery));
// 	};

// 	const handleKeyPress = (e) => {
// 		if (e.key === "Enter") {
// 			handleSearch();
// 		}
// 	};

// 	useEffect(() => {
// 		if (!searchQuery) {
// 			dispatch(getAllRestaurants());
// 		}
// 	}, [dispatch, searchQuery, history]);

// 	return (
// 		<div id="search-bar-container">
// 			<div className="search-bar-li">
// 				<i
// 					id="search-bar-icon"
// 					className="fa-solid fa-magnifying-glass"
// 				></i>
// 				<input
// 					className="search-bar-input"
// 					type="text"
// 					placeholder="find your next meal..."
// 					value={searchQuery}
// 					onChange={(e) => setSearchQuery(e.target.value)}
// 					onKeyPress={handleKeyPress}
// 				/>
// 			</div>
// 		</div>
// 	);
// }

// export default SearchBar;
