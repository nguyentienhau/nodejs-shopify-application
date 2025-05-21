module.exports = {
	getInstanceData(model = {}, data = {}) {
		const modelFields = Object.values(model.rawAttributes).map(function (item) {
			return item.autoIncrement ? { ...item, defaultValue: 1 } : item;
		});

		return modelFields.reduce(function (result = {}, modelField = {}) {
			const value = data[modelField.fieldName];

			if (
				(value || value === 0 || value === "") &&
				value.constructor === modelField.defaultValue.constructor &&
				(value.constructor !== Number || value >= modelField.defaultValue)
			) {
				result[modelField.fieldName] = value;
			}
		}, {});
	}
};
