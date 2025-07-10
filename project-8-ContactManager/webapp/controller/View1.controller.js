sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("project8.controller.View1", {
        onInit() {
            const oData = {
                list: [
                    { name: "Kunal Singh", phone: "9389255708", email: "shrii.kunal@gmail.com" },
                    { name: "Aman Gupta", phone: "1234567890", email: "aman@example.com" },
                    { name: "Gotam Sharma", phone: "1234567890", email: "sharma@example.com" },
                    { name: "Lucky Bist", phone: "1234567890", email: "bist@example.com" },
                ]
            };
            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "contacts")
        },
        onAddContact: function () {
            var oView = this.getView();
            var oModel = oView.getModel("contacts");
            var aList = oModel.getProperty("/list");

            var sName = oView.byId("nameInput").getValue();
            var sPhone = oView.byId("phoneInput").getValue();
            var sEmail = oView.byId("emailInput").getValue();

            if (sName && sPhone && sEmail) {
                aList.push({ name: sName, phone: sPhone, email: sEmail });
                oModel.setProperty("/list", aList);
                MessageToast.show("Contact added");

                oView.byId("nameInput").setValue("");
                oView.byId("phoneInput").setValue("");
                oView.byId("emailInput").setValue("");
            } else {
                MessageToast.show("Please fill in all fields.");
            }
        },

        onDeleteContact: function (oEvent) {
            var oModel = this.getView().getModel("contacts");
            var aList = oModel.getProperty("/list");
            var sPath = oEvent.getSource().getBindingContext("contacts").getPath();
            var iIndex = parseInt(sPath.split("/")[2], 10);

            aList.splice(iIndex, 1);
            oModel.setProperty("/list", aList);
            MessageToast.show("Contact deleted");
        }
    });
});