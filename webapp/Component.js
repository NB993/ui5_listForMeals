sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/demo/lunchList/model/models"
], function (UIComponent, models) {
    "use strict";
    return UIComponent.extend("sap.ui.demo.lunchList.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // list model setting
            this.setModel(models.createMealModel(), "mealList");
        },
        exit: function () {
        }

    });
});