//reduces bookmarks into consecutive divs
import { generateBookmarkItem } from './BookmarkItem';

const generateBookmarkList = (bookmarks) => {
	return Object.values(bookmarks).reduce( (list, bookmark) => {
		return list += generateBookmarkItem(bookmark);
	}, '');
}



export default generateBookmarkList;
