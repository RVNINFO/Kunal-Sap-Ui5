sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
      onInit() {},
      onSubmit: function () {
        const name = this.byId("nameInput").getValue();
        const feedback = this.byId("feedbackInput").getValue();
        if (!name || !feedback) {
          MessageToast.show("Please fill all fields");
          return;
        }
        MessageToast.show("Thank you for your feedback, " + name + "!");
      },
      onClear() {
        const name = this.byId("nameInput");
        const feedback = this.byId("feedbackInput");
        if(name) name.setValue('');
        if(feedback) feedback.setValue('');
        MessageToast.show("Form Cleared");
      },
    });
  }
);
