sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        onInit: function () {
            const oModel = new JSONModel(sap.ui.require.toUrl("project2/model/tasks.json"));
            this.getView().setModel(oModel);
        },
        onAddTask: function () {
            const oView = this.getView();
            const oModel = oView.getModel();
            const newTask = this.byId("taskInput").getValue().trim();

            if (!newTask) {
                MessageToast.show("Write Something");
                return;
            }

            const allTasks = oModel.getProperty("/tasks");
            allTasks.push({ text: newTask, done: false });
            oModel.setProperty("/tasks", allTasks);
            this.byId("taskInput").setValue("")

            MessageToast.show("New task Added");
        },
        onToggleStatus: function (oEvent) {
            const oItem = oEvent.getSource();
            const oContext = oItem.getBindingContext();
            const isDone = oContext.getProperty("done");
            oContext.getModel().setProperty(oContext.getPath() + "/done", !isDone);

            MessageToast.show(`Task is marked as ${!isDone ? 'done' : 'pending'}`);
        }
    });
});