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
		const form = $('#add-new-form');
		let formData = form.serializeJson();
		formData = JSON.parse(formData);
		formData.url = store.correctURL(formData.url);
		formData = JSON.stringify(formData);
		console.log(formData);
		api.addBookmark(formData)
		.then( bookmark => {
			store.addBookmark(bookmark);
			store.defaultViewMode();
			form.toggleClass('hidden');
			render();
		}).catch( e => {
			store.error = e;
			render();
		});
	});
}

const onDeleteClick = () => {
	$('main').on('click', '.js-delete-button', (e) => {
		e.preventDefault();
		const idStr = $(e.target).attr('id');
		const id = store.getIdFromKeyElement(idStr, 'delete');
		api.deleteBookmark(id)
		.then( (res) => {
			store.deleteBookmark(id);
			render();
		}).catch( (e) => {
			store.error = e;
			render();
		});
	})
}

const onAcceptEditSubmit = () => {
	$('main').on('submit', 'form.js-bookmark-editing', (e) => {
		e.preventDefault();

		const form = $(e.currentTarget);
		const id = form.attr('id');
		let formData = form.serializeJson();
		formData = JSON.parse(formData);
		formData.url = store.correctURL(formData.url);
		formData = JSON.stringify(formData);
		api.updateBookmark(id, formData).then( res => {
			store.updateBookmark(id, formData);
			store.disableEditing(id);
			render();

		}).catch((e) => {
			store.error = e;
			render();
		});
	});
}

const onDismissErro = () => {
	$('#error').on('click', '#dismiss-error', (e) => {
		store.dismissError();
		render();
	})
}
//:::::::::::::::::: Render and Error functions :::::::::::::::::::::::::::::::::
const renderError = () => {
	const errorEl = $('#error');
	if(!store.error) return errorEl.empty();
	const errorMessage = store.error.message;
	errorEl.html(`
		<div class="ui segment error-message vertical-flex">
		<h2 class="ui center aligned header">${errorMessage}</h2>
	   <button id="dismiss-error"><i class="times icon"></i></button>
	  </div>
		`);
}

const render = () => {
	renderError();
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
	onDeleteClick();
	onDismissErro();
}

export default {
		initEventHandlers,
    render
}
