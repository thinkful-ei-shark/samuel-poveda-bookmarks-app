import store from 'store';

const renderNewItemForm = () => {
	if (store.mode === 'add') return `
						<section>
	            <form  class="js-bookmark-add ui segment" id="add-new-form">
	                <div class="ui container flex">
	                    <div class="ui small labeled input">
	                        <label for="new-item-title" hidden>Type your title here:</label>
	                        <input class="ui big input" name="title" id="new-item-title" placeholder="Title" required>
	                    </div>
	                            <div class="ui js-dropdown Dropdown">
	                                <label class="ui header medium" name="rating-selection" for="new-item">Rating:</label>
	                                <select name="rating" class="ui button js-rating-dropdown rating" id="new-item" required>
	                                    <option value="">--Select Rating--</option>
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
	                            https://
	                        </div>
	                    <label for="new-item-url" hidden>Type the url here</label>
	                    <input type="text" id="new-item-url" name="url" required>
	                    </div>
	                <div class="js-expansion bookmark-expansion editing ui container flex">
	                    <div class="vertical-flex">
	                        <label class="flex-one ui small header" for="new-item-desc">Description:</label>
	                        <textarea class="flex-one" id="new-item-desc" name="desc"></textarea>
	                    </div>
	                    <div class="expanded-buttons">
	                        <button type="reset" id="cancel-submit-button" class="ui button" name="cancel-submit-button">Cancel</button>
	                        <button id="submit-bookmark-button" class="js-add-button ui button" name="submit-bookmark-button">Add</button>
	                    </div>
	                </div>
	            </form>
	        </section>`;
					return '';
}

export default renderNewItemForm;
