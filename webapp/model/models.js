sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function (JSONModel) {
	"use strict";

	return {
		createMealModel: function () {
			var oModel = new JSONModel();
			oModel.loadData("./model/mealList.json",false);
			return oModel;
		}
	};
});