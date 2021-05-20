const localStorage = require("localStorage");


/**
	 * Function helps remove items from local storage, along with any associated comments/replies
	 * The recursive portion is due to the fact that comments can have child comments. Without the
	 * recursion deleting a comment/post will only delete 1 level deep in thread.
	 * @param {string} type 
	 * @param {object} itemToRemove 
	 * @returns 
	 */
function removeItem(type, itemToRemove) {
	if (!itemToRemove) {
		const err = new Error('Item not found');
		err.status = 404;
		throw err;
	}
	
	// Remove single Item from storage
	const id = itemToRemove.id;
	localStorage.removeItem(id);
	const storageItems = { ...localStorage } ;

	// Remove any potential children of the item removed
	for(let item in storageItems) {
		const parsedItem = JSON.parse(storageItems[item]);
		// If post is deleted, then all comments associated with post thread should be removed
		if (itemToRemove.type == type && parsedItem.postId == id) {
			localStorage.removeItem(parsedItem.id);
		} else if (itemToRemove.type == type && parsedItem.parentCommentId == id) {
			// If comment is deleted, then all children comments should be removed
			removeItem("comment", parsedItem);
		}
	}
}

module.exports = {
	storeItem: (data) => {
		localStorage.setItem(data.id, JSON.stringify(data));
	},
	getItem: (id) => {
		return localStorage.getItem(id);
	},
	getAllItems: (storageItems, type) => {
		const items = [];
		for(let storageItem in storageItems) {
			const parsedItem = JSON.parse(storageItems[storageItem]);
			if (parsedItem.type == type)
				items.push(parsedItem);
		}
		return items;
	},
	removeItem
}