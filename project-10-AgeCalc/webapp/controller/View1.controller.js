sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("project10.controller.View1", {
        onCalculateAge: function () {
            var oDatePicker = this.byId("dobPicker");
            var oDate = oDatePicker.getDateValue();
            if (!oDate) {
                MessageToast.show("Please select a valid date of birth.");
                return;
            }
            var today = new Date();
            var birthDate = new Date(oDate);
            var years = today.getFullYear() - birthDate.getFullYear();
            var months = today.getMonth() - birthDate.getMonth();
            var days = today.getDate() - birthDate.getDate();
            if (days < 0) {
                months--;
                days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // days in prev month
            }
            if (months < 0) {
                years--;
                months += 12;
            }
            var result = "Your age is: " + years + " years, " + months + " months, and " + days + " days";
            this.byId("resultText").setText(result);
        }
    });
});
