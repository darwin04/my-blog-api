const localStorage = require("localStorage");
const {  storeItem, getItem, removeItem, getAllItems } = require('../utils/storage');
const {  setCommonCommentData } = require('../utils/helpers');

module.exports = {
  createComment: async (req, res, next) => {
		try {
			const data = setCommonCommentData(req, {}, false);
			storeItem(data);
			res.status(201).json(data);
		} catch (e) {
			next(e);
		}
	},
	getComment: async (req, res, next) => {
		try {
			const comment = getItem(req.params.id);
			if (!comment) {
				const err = new Error('Comment not found');
				err.status = 404;
				throw err;
			}

			res.json(JSON.parse(comment));
		} catch (e) {
			next(e);
		}
	},
	getAllComments: async (req, res, next) => {
		try {
			res.json(getAllItems({ ...localStorage }, "comment"));
		} catch (e) {
			next(e);
		}
	},
	updateComment: async (req, res, next) => {
		try {
			const comment = getItem(req.params.id);
			if (!comment) {
				const err = new Error('Comment not found');
				err.status = 404;
				throw err;
			}
			const data = setCommonCommentData(req, JSON.parse(comment), true);
			storeItem(data);
			res.status(201).json(data);
		} catch (e) {
			next(e);
		}
	},
	deleteComment: async (req, res, next) => {
		try {
			removeItem("comment", JSON.parse(localStorage.getItem(req.params.id)));
			res.status(200).end();
		} catch (e) {
			next(e);
		}
	},
}