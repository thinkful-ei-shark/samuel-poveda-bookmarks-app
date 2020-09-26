const BASE_URL = 'https://thinkful-list-api.herokuapp.com/sam'

const fetchHandler = (...args) => {
	let error = null;
	 return fetch(...args).then( response => {
		if (!response.ok) {
			console.log(response);
			error = { code: response.status};
			if (!response.headers.get('Content-Type').includes('json')) {
				error.message = response.statusText;
			}
			return Promise.reject(error);
		}
		return response.json();
	})
	.then(data => {
		console.log('data:',data);
		if (error) {
			error.message = data.message;
			return Promise.reject(error);
		}
		return data;
	});
}

const getBookMarks = () => {
	return fetchHandler(`${BASE_URL}/bookmarks`, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

const addBookMark = () => {

}

const updateBookMarks = (id, data) => {
	return fetchHandler(`${BASE_URL}/bookmarks`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
}

const deleteBookMark = (id) => {
	return fetchHandler(`${BASE_URL}/bookmarks/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export default {
	getBookMarks,
	updateBookMarks,
	deleteBookMark,
}
