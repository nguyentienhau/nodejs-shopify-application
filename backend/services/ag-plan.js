const { Op } = require("sequelize");
const { AgPlan } = require("../models");
const { SequelizeHelpers } = require("../helpers");

module.exports = {
	read: async function (_agUser = {}, data = []) {
		try {
			if (data && data.isArray()) {
				const validData = data.map((item) => SequelizeHelpers.getInstanceData(AgPlan, item));
				const options = data.length > 0 ? { where: { [Op.or]: validData } } : {};
				const result = await AgPlan.findAll(options);
				return { success: true, data: result, message: "Read successfully" };
			} else {
				return { success: false, message: "Invalid data" };
			}
		} catch (error) {
			return { success: false, error, message: "Read failed" };
		}
	},
	upsert: async function (_agUser = {}, data = []) {
		try {
			if (data && data.isArray()) {
				const validData = data.map((item) => SequelizeHelpers.getInstanceData(AgPlan, item));
				const options = { updateOnDuplicate: ["id"] };
				const result = await AgPlan.bulkCreate(validData, options);
				return { success: true, data: result, message: "Save successfully" };
			} else {
				return { success: false, message: "Invalid data" };
			}
		} catch (error) {
			return { success: false, error, message: "Save failed" };
		}
	},
	delete: async function (_agUser = {}, data = []) {
		try {
			if (data && data.isArray()) {
				const validData = data.map((item) => SequelizeHelpers.getInstanceData(AgPlan, item));
				const options = data.length > 0 ? { where: { [Op.or]: validData } } : {};
				const result = await AgPlan.destroy(options);
				return { success: true, data: result, message: "Delete successfully" };
			} else {
				return { success: false, message: "Invalid data" };
			}
		} catch (error) {
			return { success: false, error, message: "Delete failed" };
		}
	}
};
