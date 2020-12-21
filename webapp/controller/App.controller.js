sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict"

    return Controller.extend("sap.ui.demo.lunchList.App", {
        onInit: function() {
            this._pFnInitModel();
        },

        onPressSegBtn : function(oEvent) {
            
            this.onFilter(oEvent);
        },

        onFilter : function(oEvent) {
            var oView = this.getView(),
                oModel = oView.getModel(),
                oTable = oView.byId("table01"),
                oBinding = oTable.getBinding("items"),
                sSelectedPlace = oModel.getProperty("/header/selectedPlace"),
                oCountry = oModel.getProperty("/header/country"),
                aFilter = [],
                aSelectedCountry = [];

            // place
            if(sSelectedPlace !== "anywhere") {
                aFilter.push(new Filter("Place", FilterOperator.Contains, sSelectedPlace));
            }

            // country
            for(let key in oCountry) {
                if(oCountry[key] === true) {
                    aSelectedCountry.push(key);
                }
            }
            if(aSelectedCountry.length < 1) {
                aFilter.push(new Filter("Country", FilterOperator.EQ, ""));
            }
            aSelectedCountry.forEach(function(sSelectedCountry) {
                aFilter.push(new Filter("Country", FilterOperator.Contains, sSelectedCountry));
            });
            
            // SearchField
            var sClassName = oEvent.getSource().getMetadata().getName();
            if(sClassName.includes("SearchField")) {
                let sSearchFieldValue = oEvent.getSource().getValue();
                if(sSearchFieldValue && sSearchFieldValue.length > 0) {
                    aFilter.push(new Filter("Name", FilterOperator.Contains, sSearchFieldValue));
                }
            }

            oBinding.filter(aFilter, "Application");
        },

        placeFormatting : function(sPlace) {
            var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            switch(sPlace) {
                case "outside" :
                    return oResourceBundle.getText("segmentedBtnOutside");
                case "inside" :
                    return oResourceBundle.getText("segmentedBtnInside");
                default:
                    return oResourceBundle.getText("colBothAvailable");
            }
            
        },

        _pFnInitModel : function() {
            var oModel = new JSONModel({
                "currency": "KRW",
                "header" : {
                    "selectedPlace" : "anywhere",
                    "country" : {
                        "korea" : true,
                        "china" : true,
                        "japan" : true,
                        "western" : true
                    }
                }
            });
            this.getView().setModel(oModel);

            var oRestaurantModel = this.getOwnerComponent().getModel("restaurantList");
            this.getView().setModel(oRestaurantModel, "restaurantList");
        }
    });
});