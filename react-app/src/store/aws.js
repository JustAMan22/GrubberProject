const AWS_URL = "AWS_URL";

const awsUrl = (url) => ({
	type: AWS_URL,
	url,
});

export const getAwsUrl = (image) => async (dispatch) => {
	const res = await fetch("/api/images/get-aws-url", {
		method: "POST",
		body: image,
	});

	if (res.ok) {
		const resultUrl = await res.json();
		dispatch(awsUrl(resultUrl));
	} else {
		console.log("There was an error making your post!");
	}
};

const awsReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case AWS_URL:
			newState[action.url] = action.url;
			return newState;
		default:
			return state;
	}
};

export default awsReducer;
