sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project4.controller.View1", {
        onInit: function () {
            const oData = {
                currencies: ["USD", "INR", "EUR"],
                rates: {
                    USD: { INR: 83, EUR: 0.92 },
                    INR: { USD: 0.012, EUR: 0.011 },
                    EUR: { USD: 1.09, INR: 90.8 }
                }
            };

            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "currency");
        },

        onConvertPress: function () {
            const oView = this.getView();
            const oModel = oView.getModel("currency");

            const amount = parseFloat(oView.byId("amountInput").getValue());
            const fromCurrency = oView.byId("fromCurrencySelect").getSelectedKey();
            const toCurrency = oView.byId("toCurrencySelect").getSelectedKey();

            const rate = oModel.getProperty(`/rates/${fromCurrency}/${toCurrency}`);

            if (!isNaN(amount) && fromCurrency && toCurrency && rate) {
                const result = (amount * rate).toFixed(2);
                oView.byId("resultText").setText(`${amount} ${fromCurrency} = ${result} ${toCurrency}`);
            } else {
                oView.byId("resultText").setText("Converted amount will appear here.");
            }
        }
    });
});
