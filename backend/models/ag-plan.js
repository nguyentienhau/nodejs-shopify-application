const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize = {}) {
	class AgPlan extends Model {
		static associate(models = {}) {
			this.hasMany(models["AgUser"], { foreignKey: "planId", as: "users" });
		}
	}

	AgPlan.init(
		{
			code: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				defaultValue: ""
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			version: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 1,
				validate: { min: 1 }
			}
		},
		{ sequelize, modelName: "AgPlan", tableName: "ag_plan", underscored: true }
	);

	return AgPlan;
};
