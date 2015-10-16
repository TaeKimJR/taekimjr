/**
 * Main JS file for Tae Kim JR Blog behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        initHeroSectionContent();

    });

    function initHeroSectionContent() {
        var $heroSection = $('#hero');
        var $heroContent = $heroSection.find('.content');

        calculateAndSetContentPosition();
        fadeInContent();
        initResizeHandler();

        function calculateAndSetContentPosition() {
            var heroSectionHeight = $heroSection.outerHeight();
            var heroContentHeight = $heroContent.outerHeight();
            var heroContentPosition = ( heroSectionHeight / 2 ) - heroContentHeight;
            $heroContent.css('top', heroContentPosition.toString() + 'px');
        }

        function fadeInContent() {
            $heroContent.css('opacity', '1');
        }

        function initResizeHandler() {
            $( window ).resize(function() {
                calculateAndSetContentPosition();
            });
        }
    }

})(jQuery);
