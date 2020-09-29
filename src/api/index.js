const BASE_URL = 'https://thinkful-list-api.herokuapp.com/sam'

const fetchHandler = (...args) => {
	let error = null;
	 return fetch(args[0], args[1]).then( response => {
		if (!response.ok) {
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

const getBookmarks = (data) => {
	return fetchHandler(`${BASE_URL}/bookmarks`, {
		headers: {
			'Content-Type': 'application/json'
		},
		body: data
	});
}

const addBookmark = (bookmark) => {
	return fetchHandler(`${BASE_URL}/bookmarks/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: bookmark
	})
}

const updateBookmark = (id, data) => {
	return fetchHandler(`${BASE_URL}/bookmarks/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: data
	});
}

const deleteBookmark = (id) => {
	return fetchHandler(`${BASE_URL}/bookmarks/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export default {
	getBookmarks,
	addBookmark,
	updateBookmark,
	deleteBookmark,
}
