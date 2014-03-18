// ==UserScript==
// @name        Serienjunkies Customer
// @namespace   maha
// @include     http://serienjunkies.org/*
// @grant       none
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @run-at      document-end
// @version     0.2.1
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
            this.shows = [
                {
                    id: 'mentalist',
                    name: 'Mentalist',
                    quality: '720p'
                },
                {
                    id: 'ncisla',
                    name: 'NCIS.Los.Angeles',
                    quality: '720p'
                }
            ];

            this.$container = $('.post-content');
            this.$model = null;
            this.createNewsModel();
            this.findAndAppendLinks();
            this.$container.prepend(this.$model);
        },

        createNewsModel: function () {
            var that = this;
            this.$model = $('<fieldset><legend>Meine Serien</legend><div class="content"></div></fieldset>');

            $(this.shows).each(function () {
                var $ul = $('<ul class="' + this.id + '"></ul>');
                that.$model.find('div.content').append($ul);
            });
        },

        findAndAppendLinks: function () {
            var that = this;

            $('a').each(function () {
                var text = $(this).text(),
                    $a = $(this);

                $(that.shows).each(function () {
                    if (text.indexOf(this.name) != -1 && text.indexOf(this.quality) != -1) {
                        var $li = $('<li></li>');
                        if (text.indexOf('German') != -1 || text.indexOf('GERMAN') != -1) {
                            that.$model.find('ul.' + this.id).append($li.append($a));
                        }

                    }
                });
            });
        }
    };

    var options = null;
    new SerienJunkies(options);

}(window.jQuery));