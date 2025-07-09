sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("project3.controller.View1", {
        onInit: function () {
            const oView = this.getView();
            const oQuestionModel = new JSONModel(sap.ui.require.toUrl("project3/model/quiz.json"));
            oQuestionModel.attachRequestCompleted(() => {
                const aQuestions = oQuestionModel.getData().questions;
                const oData = {
                    questions: aQuestions,
                    currentIndex: 0,
                    currentQuestion: aQuestions[0],
                    selectedIndex: -1,
                    score: 0,
                    scoreText: "Score: 0"
                };
                const oModel = new JSONModel(oData);
                oView.setModel(oModel);

                this.byId("optionsGroup").setSelectedIndex(-1);
            });
        },

        onSelectOption: function (oEvent) {
            const isSelected = oEvent.getParameter("selectedIndex");
            const oModel = this.getView().getModel();
            oModel.setProperty("/selectedIndex", isSelected);
        },

        onNextQuestion: function () {
            const oModel = this.getView().getModel();
            const selected = oModel.getProperty("/selectedIndex");
            const currentIdx = oModel.getProperty("/currentIndex");
            const aQuestions = oModel.getProperty("/questions");

            if (selected == null || selected == -1) {
                MessageToast.show("Select an Option");
                return;
            }

            const correctIndex = aQuestions[currentIdx].answer;
            let score = oModel.getProperty("/score");

            if (selected === correctIndex) {
                MessageToast.show("Correct Answer");
                score++;
                oModel.setProperty("/score", score);
            } else {
                MessageToast.show("Wrong Answer !")
            }

            const nextIndex = currentIdx + 1;

            if (nextIndex < aQuestions.length) {
                oModel.setProperty("/currentIndex", nextIndex);
                oModel.setProperty("/currentQuestion", aQuestions[nextIndex]);
                oModel.setProperty("/selectedIndex", -1);
                oModel.setProperty("/scoreText", "Score: " + score);
                this.byId("optionsGroup").setSelectedIndex(-1);
            } else {
                oModel.setProperty("/scoreText", "Final Score: " + score + "/" + aQuestions.length);
                this.byId("quizPanel").setHeaderText("Quiz Completed");
                this.byId("optionsGroup").setVisible(false);
                this.byId("question").setText("Thanks for participating!");
            }
        }
        
    });
});

