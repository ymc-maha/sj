// ==UserScript==
// @name        Serienjunkies Customer
// @namespace   maha
// @include     http://serienjunkies.org/*
// @grant       none
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @run-at      document-end
// @version     0.1.1
// @updateURL   https://raw.githubusercontent.com/ymc-maha/sj/master/sj.meta.js
// @downloadURL https://raw.githubusercontent.com/ymc-maha/sj/master/sj.user.js
// ==/UserScript==


(function ($) {

    "use strict";

    var SerienJunkies = function (options) {
        this.init(options);
    };

    SerienJunkies.prototype = {

        constructor: SerienJunkies,

        init: function (options) {
            var that = this;
            this.shows = {
                mentalist: 'Mentalist',
                ncisla: 'NCIS.Los.Angeles',
                ncis: 'NCIS.S',
                hawaii: 'Hawaii.Five'
            };
            this.$container = $('.post-content');
            this.$model = null;
            this.createNewsModel();
            this.$container.prepend(this.$model);
        },

        createNewsModel: function () {
            this.$model = $('<fieldset><legend>Meine Serien</legend></fieldset>');
        }


    };

    var options = null;
    new SerienJunkies(options);

}(window.jQuery));