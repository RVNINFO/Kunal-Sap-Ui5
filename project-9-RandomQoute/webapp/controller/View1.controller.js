sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("project9.controller.View1", {
        onInit: function () {
            this.aQuotes = [
                "The best way to get started is to quit talking and begin doing. - Walt Disney",
                "Don’t let yesterday take up too much of today. - Will Rogers",
                "It’s not whether you get knocked down, it's whether you get up. - Vince Lombardi",
                "If you are working on something exciting, it will keep you motivated. - Steve Jobs",
                "Success is not in what you have, but who you are. - Bo Bennett"
            ];

            var oModel = new JSONModel({ quote: this._getRandomQuote() });
            this.getView().setModel(oModel);
        },

        onNewQuote: function () {
            var sQuote = this._getRandomQuote();
            this.getView().getModel().setProperty("/quote", sQuote);
        },

        _getRandomQuote: function () {
            var i = Math.floor(Math.random() * this.aQuotes.length);
            return this.aQuotes[i];
        }
    });
});
