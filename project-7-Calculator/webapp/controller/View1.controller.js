sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("project7.controller.View1", {
        onInit() {
            const historyModel = new JSONModel({ history: [] });
            this.getView().setModel(historyModel);
        },
        getValue: function () {
            const input1 = parseFloat(this.byId("input1").getValue());
            const input2 = parseFloat(this.byId("input2").getValue());
            if (isNaN(input1) || isNaN(input2)) {
                MessageToast.show("Enter valid numbers");
                return;
            }
            return { input1, input2 };
        },
        updateResult: function (result, expression) {
            const formattedResult = result.toFixed(2);
            this.byId("resultText").setText(`Result: ${formattedResult}`);

            const model = this.getView().getModel();
            const history = model.getProperty("/history");
            history.unshift({ calc: `${expression} = ${formattedResult}` });
            model.setProperty("/history", history);
        },
        onAdd: function () {
            const { input1, input2 } = this.getValue();
            const result = input1 + input2;
            this.updateResult(result, `${input1} + ${input2}`);
        },
        onSubtract: function () {
            const { input1, input2 } = this.getValue();
            const result = input1 - input2;
            this.updateResult(result, `${input1} - ${input2}`);
        },
        onMultiply: function () {
            const { input1, input2 } = this.getValue();
            const result = input1 * input2;
            this.updateResult(result, `${input1} * ${input2}`);
        },
        onDivide: function () {
            const { input1, input2 } = this.getValue();
            if (input2 === 0) {
                MessageToast.show("Can not divide a number by ZERO")
                return;
            }
            const result = input1 / input2;
            this.updateResult(result, `${input1} / ${input2}`);
        }
    });
});