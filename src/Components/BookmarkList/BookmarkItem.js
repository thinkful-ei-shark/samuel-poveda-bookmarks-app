import './BookmarkItem.css';
import {SEE_LESS_KEY, SELECT_KEY, TITLE_KEY, DESC_KEY, LABEL_KEY, URL_KEY, DELETE_KEY} from 'store';

import $ from 'jquery';

export const generateBookmarkItem = bookmarkObj => {

	// if the bookmark isn't labeled for editing render the normal view
	//otherwise, render the editable space
	if (!bookmarkObj.editable){
		let ratingIcons = '';
		if (bookmarkObj.rating) {
		let counter = bookmarkObj.rating;
//add number of stars based on the rating
		while (counter > 0) {
			ratingIcons += `<i class="big star icon"></i>`;
			counter--;
		}
		} else {
			ratingIcons = '<p class="ui header medium">No rating</p>';
	}
		if (!bookmarkObj.expanded) return `
	<div class="js-bookmark bookmark ui segment" id="${bookmarkObj.id}" tabindex=0>
					<h2 class="ui huge header">${bookmarkObj.title}</h2>
					<div class="ui js-rating rating">${ratingIcons}</div>
		</div>
	`;
	return `
	<div class="js-bookmark-expanded bookmark-expanded ui segment" id="${bookmarkObj.id}" tabindex=0>
	    <div class="ui container flex">
	        <h2 class="ui huge header">${bookmarkObj.title}</h2>
	        <div class="ui js-rating rating">${ratingIcons}</div>
	    </div>
	    <div class="js-expansion bookmark-expansion ui container flex">
	        <p class="js-description desc ui small header">${bookmarkObj.desc}</p>
	        <div class="js-expanded-buttons">
	            <a href="${bookmarkObj.url}" target="_blank"><button class="js-visit-site ui button" name="visit-site-button">Visit Site</button></a>
	            <button class="js-edit-button ui button" name="edit-button">Edit</button>
	        </div>
	    </div>
			<hr>
			<h3 class="js-see-less see-less ui small header centered" id="${bookmarkObj.id + SEE_LESS_KEY}" tabindex=0>${SEE_LESS_KEY}</h3>
	</div>
	`;
	}
	return `
	<form class="js-bookmark-editing bookmark-expanded ui segment" id="${bookmarkObj.id}" tabindex=0>
	    <div class="ui container flex">
	        <div class="ui small labeled input">
	                    <input class="ui big input" name="title" id="${bookmarkObj.id + TITLE_KEY}" value="${bookmarkObj.title}" placeholder="Title" autofocus>
	                </div>
	                <div class="ui js-dropdown Dropdown">
	                    <label class="ui header medium" name="rating-selection" for="${bookmarkObj.id + LABEL_KEY}">Rating:</label>
	                    <select name="rating" class="ui button js-rating-dropdown rating" id="${bookmarkObj.id + SELECT_KEY}">
	                        <option value="1">1 Star</option>
	                        <option value="2">2 Stars</option>
	                        <option value="3">3 Stars</option>
	                        <option value="4">4 Stars</option>
	                        <option value="5">5 Stars</option>
	                        </select>
	                </div>
	        </div>
	        <div class="ui small labeled input">
	            <div class="ui label">
	                http://
	            </div>
	        <input type="text" id="${bookmarkObj.id + URL_KEY}" name="url" placeholder="mysite.com" value="${bookmarkObj.url}" required>
	        </div>
	    <div class="js-expansion bookmark-expansion editing ui container flex">
	        <textarea id="${bookmarkObj.id + DESC_KEY}" name="desc" class="js-description desc ui small header">${bookmarkObj.desc}</textarea>
	        <div class="js-expanded-buttons">
							<button type="reset" id="${bookmarkObj.id + DELETE_KEY}" class="js-delete-button ui red button" name="delete-button">Delete</button>
	            <a href="#" class="js-cancel-edit-button ui button" name="cancel-edit-button">Cancel</a>
	            <button class="js-accept-edit-button ui button" name="accept-edit-button">Accept</button>
	        </div>
	    </div>
	</form>
			`;

}
