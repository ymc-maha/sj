// ==UserScript==
// @name        Serienjunkies Customer
// @namespace   maha
// @include     http://serienjunkies.org/*
// @grant       none
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @run-at      document-end
// @version     0.2.2
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
            this.$tpl = null;
            this.createTemplate();
            this.findAndAppendLinks();
            this.initObserver();

            this.$container.prepend(this.$tpl);
        },

        initObserver: function () {
            var that = this;
            this.$tpl.on('click', 'button.add', function () {
                var $options = that.$tpl.find('div.options');
                if ($options.css('display') == 'none') {
                    that.$tpl.find('div.options').show();
                } else {
                    that.$tpl.find('div.options').hide();
                }
            });
        },

        createTemplate: function () {
            var $body = $('<fieldset></fieldset>'),
                $title = $('<legend>Meine Serien <button class="add">+</button></legend>'),
                $content = $('<div class="content"></div>'),
                $options = $('<div class="options">lala</div>').hide();

            $body.append($title)
                .append($options)
                .append($content);

            $(this.shows).each(function () {
                var $ul = $('<ul class="' + this.id + '"></ul>');
                $content.append($ul);
            });

            this.$tpl = $body;
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
                            that.$tpl.find('ul.' + this.id).append($li.append($a));
                        }

                    }
                });
            });
        }
    };

    var options = null;
    new SerienJunkies(options);

}(window.jQuery));