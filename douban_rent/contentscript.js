(function ($) {
    var wanDouJiaExt = {
        init: function (keywords) {
            var article = $('#content .article');
            var titles = article.find('td a');
            var results = [];
            var keywords = keywords.split(' ');
            titles.each(function () {
                var self = $(this);
                var title = self.attr('title');
                if (wanDouJiaExt.findKeywords(keywords, title)) {
                    results.push('<p>' + self.parent().html() + '</p>');
                }
            });

            for (var i = 0; i < results.length; i++) {
                $('#wrapper').prepend(results[i]);
            }

            var paginator = $('.paginator').clone();
            $('#wrapper').prepend(paginator);

        },
        findKeywords: function (keywords, text) {
            var i = 0;
            for (; i < keywords.length; i++) {
                console.log(text.indexOf(keywords[i]));
                if (text.indexOf(keywords[i]) >= 0) {
                    return true;
                }
            }
            return false;
        }
    };
    chrome.storage.sync.get({
        keywords:"东城 10号 东四十条"
    }, function (items) {
        wanDouJiaExt.init(items.keywords);
    });

})(jQuery);
