// ==UserScript==
// @name        Serienjunkies Customer
// @namespace   maha
// @include     http://serienjunkies.org/*
// @grant       GM_addStyle
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @run-at      document-end
// @version     0.3.3
// @updateURL   https://raw.githubusercontent.com/ymc-maha/sj/master/sj.meta.js
// @downloadURL https://raw.githubusercontent.com/ymc-maha/sj/master/sj.user.js
// ==/UserScript==


(function ($) {

    "use strict";

    var SerienJunkies = function (shows) {
        this.init(shows);
    };

    SerienJunkies.prototype = {

        constructor: SerienJunkies,

        init: function (shows) {
            this.shows = shows;
            this.$container = $('.post-content');
            this.$tpl = null;
            this.createTemplate();
            this.findAndAppendLinks();
            this.$container.prepend(this.$tpl);
        },

        createTemplate: function () {
            var $body = $('<fieldset class="personal"></fieldset>'),
                $title = $('<legend>Meine Serien</legend>'),
                $content = $('<div class="content" style="border: none;"></div>');

            $body.append($title)
                .append($content);

            $(this.shows).each(function () {
                var $ul = $('<ul style="padding-left: 0" class="' + this.id + '"></ul>');
                $content.append($ul);
            });

            this.$tpl = $body;
        },

        findAndAppendLinks: function () {
            var that = this;

            this.$container.find('a').each(function () {
                var text = $(this).text(),
                    $a = $(this);

                $(that.shows).each(function () {
                    if (text.indexOf(this.name) != -1 && text.indexOf(this.quality) != -1) {
                        var $li = $('<li style="padding-left: 0"></li>');
                        if (text.indexOf('German') != -1 || text.indexOf('GERMAN') != -1) {
                            that.$tpl.find('ul.' + this.id).append($li.append($a));
                        }

                    }
                });
            });
        }
    };

    var shows = [
        {
            id: 'mentalist',
            name: 'Mentalist',
            quality: '720p'
        },
        {
            id: 'ncisla',
            name: 'NCIS.Los.Angeles',
            quality: '720p'
        },
        {
            id: 'ncis',
            name: 'NCIS.S',
            quality: '720p'
        },
        {
            id: 'hawaii',
            name: 'Hawaii.Five.0',
            quality: '720p'
        },
        {
            id: 'brokegirls',
            name: '2.Broke.Girls',
            quality: '720p'
        },
        {
            id: 'mother',
            name: 'How.I.Met.Your.Mother',
            quality: '720p'
        },
        {
            id: 'bigbang',
            name: 'The.Big.Bang.Theory',
            quality: '720p'
        },
        {
            id: 'suburgatory',
            name: 'Suburgatory',
            quality: '720p'
        },
        {
            id: 'mum',
            name: 'Mike.und.Molly',
            quality: '720p'
        }
    ];

    if ($('#gnav .current_page_item a').text() == "Home") {
        new SerienJunkies(shows);
    }

}(window.jQuery));