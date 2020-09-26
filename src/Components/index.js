import $ from 'jquery';
import BookmarkList from './BookmarkList';
import store from 'store';
import Header from './Header';
import api from 'api';
import { getIdFromKeyElement, SELECT_KEY} from 'store'

$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }
});


//funcs that alter rendering locally ::::::::::::::::::::::::::::::::::::

const onSeeLessClick = () => {
	$('main').on('click', '.js-see-less', (e) => {
		const idStr = $(e.currentTarget).attr('id');
		console.log('idStr:',idStr);
		const id = getIdFromKeyElement(idStr,'see-less');
		store.contract(id);
		render();
	});
}

const onBookmarkClick = () => {
	$('main').on('click', '.js-bookmark', (e) => {
		const id = $(e.currentTarget).attr('id');
		console.log(id);
		store.expand(id);
		render();
	});
}

const onFilterByChange = () => {
	$('header').on('change', '#filter-button', (e) => {
		const filter = $(e.currentTarget).val();
		store.setFilter(filter);
		render();
	});
}

const onAddNewBookmarkClick = () => {
	$('header').on('click', '#add-new-button', (e) => {
		$('#add-new-form').toggleClass('hidden');
		store.enableAdding();
		render();
	})
}

const onAddNewCancel = () => {
	$('main').on('click', '#cancel-submit-button', (e) => {
		$('#add-new-form').toggleClass('hidden');
		store.defaultViewMode();
		render();
	})
}


const onEnterBookmark = () => {
	$('main').on( 'keypress', '.js-bookmark', (e) => {
		if (e.keyCode === 13) {
			$(e.currentTarget).click();
		}
	})
}

const onEnterSeeLess = () => {
	$('main').on('keypress', '.js-see-less', (e) => {
		if (e.keyCode === 13) {
			$(e.currentTarget).click();
		}
	});
}

const onEditClick = () => {
	$('main').on('click', '.js-edit-button', (e) => {
		const id = $(e.target).closest('.js-bookmark-expanded').attr('id');
		if(store.mode === 'add') $('#cancel-submit-button').click();
		store.enableEditing(id);
		render();
		$(`#${id + SELECT_KEY}`).find(`option[value="${store.bookmarks[id].rating}"]`).prop('selected',true);
	});
}

const onCancelEditClick = (e) => {
	$('main').on('click', '.js-cancel-edit-button', e =>{
		e.preventDefault();
		console.log('cancel evt');
		const id = $(e.target).closest('form').attr('id');
		store.disableEditing(id);
		render();
	});
}
// Funcs that update bookmarks object and make api requests ::::::::::::::::::::

const onAddNewSubmit = () => {
	$('main').on('submit', '#add-new-form', (e) => {
		event.preventDefault();
		let formData = $(e.currentTarget).serializeJson();
		formData = JSON.parse(formData);
		formData.url = store.correctURL(formData.url)
		store.addBookmark(parsedData);

	});
}

const onAcceptEditSubmit = () => {
	$('main').on('submit', 'form.js-bookmark-editing', (e) => {
		e.preventDefault();
		console.log('form submitted');
		const form = $(e.target).closest('form');
		const id = form.attr('id');
		const data = form.serializeJson();
		store.updateBookmark(id, data);
		store.disableEditing(id);
		render();
	});
}



const render = () => {
	console.log('store on render:',store);
	const bookmarks = store.filterBookmarks();
	const header = $('header');
	const mainBookmarks = $('#bookmarks-list');
	header.html(Header.generateHeaderText(store));
	mainBookmarks.html(BookmarkList.generateBookmarkList(bookmarks));
}

const initEventHandlers = () => {
	onAddNewBookmarkClick();
	onFilterByChange();
	onBookmarkClick();
	onSeeLessClick();
	onEditClick();
	onCancelEditClick();
	onAcceptEditSubmit();
	onEnterBookmark();
	onEnterSeeLess();
	onAddNewSubmit();
	onAddNewCancel();
}

export default {
		initEventHandlers,
    render
}
