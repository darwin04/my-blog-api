const localStorage = require("localStorage");

module.exports = {
	storeItem: (data) => {
		localStorage.setItem(data.id, JSON.stringify(data));
	},
	getItem: (id) => {
		return localStorage.getItem(id);
	},
	removeItem: (id) => {
		localStorage.removeItem(id);
	},
	getAllItems: (storageItems, type) => {
		const items = [];
		for(let storageItem in storageItems) {
			const parsedItem = JSON.parse(storageItems[storageItem]);
			if (parsedItem.type == type)
				items.push(parsedItem);
		}
		return items;
	}
}