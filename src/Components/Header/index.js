import './header.css';

function generateHeaderText (store){
	let toBeDisplayed = '';
	if (store.mode === 'add') return toBeDisplayed += `<h1 class="ui header centered">Add a Bookmark</h1>`;
	if (store.mode === 'edit') return toBeDisplayed +=`<h1 class="ui header centered">Editing Bookmarks</h1>`;
	if (store.mode === 'view') return toBeDisplayed += `
	<h1 class="ui header centered">Bookmarks</h1>
	<nav class="ui container">
		<div class="ui centered flex">
	    <button class="ui big button centered" name="add-new-bookmark-button" id="add-new-button">New Bookmark</button>
			<select class="ui button right" id="filter-button" name="filter-dropdown-menu">
			    <option value="">Filter By:</option>
			    <optgroup label="Rating:">
			        <option value="1" class="ui tiny header">1+ Stars</option>
			        <option value="2" class="ui tiny header">2+ Stars</option>
			        <option value="3" class="ui tiny header">3+ Stars</option>
			        <option value="4" class="ui tiny header">4+ Stars</option>
			        <option value="5" class="ui tiny header">5+ Stars</option>
			    </optgroup>
			    </optgroup>
			</select>		</div>
	</nav>
	`;
}

export default {
	generateHeaderText
}
