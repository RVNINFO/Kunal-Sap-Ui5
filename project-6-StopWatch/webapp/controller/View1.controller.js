sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("project6.controller.View1", {
        _intervalId: null, // This is the main Flag
        _millisecs: 0,

        formatTime: function (ms) {
            const mins = String(Math.floor(ms / 6000)).padStart(2, '0');
            const secs = String(Math.floor((ms % 6000) / 100)).padStart(2, '0');
            const centis = String(ms % 100).padStart(2, '0');
            return `${mins}:${secs}:${centis}`;
        },

        updateDisplay: function () {
            const oText = this.getView().byId("timeDisplay");
            oText.setText(this.formatTime(this._millisecs));
        },

        onStart: function () {
            if (!this._intervalId) {
                this._intervalId = setInterval(() => {
                    this._millisecs++;
                    this.updateDisplay();
                }, 10);
            };
        },

        onStop: function () {
            clearInterval(this._intervalId);
            this._intervalId = null;
        },

        onReset: function () {
            this.onStop();
            this._millisecs = 0;
            this.updateDisplay();
        }
    });
});
