sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project.controller.View1", {
        onInit: function () {
            const oModel = new JSONModel({ list: [] });
            this.getView().setModel(oModel, "expenses");
        },

        onAddExpense: function () {
            const oView = this.getView();
            const oModel = oView.getModel("expenses");

            const desc = oView.byId("descInput").getValue();
            const amount = parseFloat(oView.byId("amountInput").getValue());
            const category = oView.byId("categorySelect").getSelectedKey();

            if (!desc || isNaN(amount) || !category) return;

            const aList = oModel.getProperty("/list");
            aList.push({ description: desc, amount, category });
            oModel.setProperty("/list", aList);

            const total = aList.reduce((sum, exp) => sum + exp.amount, 0);
            oView.byId("totalText").setText(`Total: ₹${total.toFixed(2)}`);

            oView.byId("descInput").setValue("");
            oView.byId("amountInput").setValue("");
            oView.byId("categorySelect").setSelectedKey(null);
        }
    });
});
