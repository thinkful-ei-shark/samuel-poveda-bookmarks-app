import $ from 'jquery';
import './css/index.css'
import api from './api/';
import store from 'store'
import App from './Components/';

//bookmarks are indexed by their id
api.getBookmarks()
.then( bookmarks => {
	bookmarks.forEach( mark => {
		store.bookmarks[mark.id] = mark;
		store.bookmarks[mark.id].expanded = false;
	});
	App.render();
});

$(
	App.initEventHandlers(),
	App.render()
);
