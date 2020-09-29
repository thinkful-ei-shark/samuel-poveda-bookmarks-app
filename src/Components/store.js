//bookmarks indexed by id
let bookmarks = {};
let error =  null;
let filter = null;
let mode = 'view';
let lastExpanded = null;

export const SEE_LESS_KEY = 'See Less';
export const SELECT_KEY = 'Select';
export const TITLE_KEY = 'Title';
export const DESC_KEY = 'Description';
export const LABEL_KEY = 'Label';
export const URL_KEY = 'url';
export const DELETE_KEY = 'delete'
export function getIdFromKeyElement (idStr, key) {
	switch (key) {
		case 'delete':
		key = DELETE_KEY;
		break;

		case 'see-less':
			key = SEE_LESS_KEY;
		break;

		case 'select':
		key = SELECT_KEY;
		break;

		case 'title':
		key = TITLE_KEY;
		break;

		case 'desc':
		key = DESC_KEY;
		break;

		case 'label':
		key = LABEL_KEY;
		break;

		case 'url':
		key = URL_KEY;
	}

	return idStr.substring(0, idStr.length - key.length);
}

function correctURL (url) {
	if (!url.match(/https?:\/\//)) return `https://${url}`;
		return url;
}

function dismissError () {
	this.error = null;
}

function setFilter (value) {
	this.filter = value;
}

//should have same behaviour as Array.filter
//and is also positive filter
Object.filter = (object, callback) => {
	let returnObj = {};
	for (let key in object) {
		if(callback(object[key]) === true) returnObj[key] = object[key];
	}
	return returnObj;
}

function filterBookmarks () {
	const targetRating = this.filter;
	let filtered = Object.filter(this.bookmarks, (bookmark) => {
		return bookmark.rating >= targetRating;
	});
	return filtered;
}

function contract (id) {
	this.bookmarks[id].expanded = false;
}

function expand (id) {
	this.bookmarks[id].expanded = true;
	this.lastExpanded = id;
}


function addBookmark (bookmark) {
	this.bookmarks[bookmark.id] = bookmark;
}

function deleteBookmark (id) {
	this.bookmarks = Object.filter(this.bookmarks, mark => mark.id !== id);
}

//only one bookmark should be edited at a time
function enableEditing(id) {
	this.mode = 'edit';

	//bookmarks are indexed by id
	for (let index in this.bookmarks) {
			if (index == id) this.bookmarks[id].editable = true;
			else {
				this.bookmarks[index].editable = false;
			}
	}
}

function defaultViewMode () {
	this.mode = 'view';
}

function disableEditing (id) {
	this.defaultViewMode();
	this.bookmarks[id].editable = false;
}

function enableAdding () {
	this.mode = 'add';
}

function validateAndDisableAdding () {

	this.defaultViewMode();
}

function updateBookmark (id, data) {
	data = JSON.parse(data);
	Object.assign(this.bookmarks[id], data);
}

export default {
    bookmarks,
		error,
		filter,
		mode,
		addBookmark,
		updateBookmark,
		deleteBookmark,
		expand,
		contract,
		defaultViewMode,
		enableEditing,
		disableEditing,
		enableAdding,
		validateAndDisableAdding,
		getIdFromKeyElement,
		filterBookmarks,
		setFilter,
		correctURL,
		dismissError
}
