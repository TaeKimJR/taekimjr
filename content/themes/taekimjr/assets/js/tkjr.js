/**
 * Main JS file for Tae Kim JR Blog behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    var SCROLL_OFFSET = 75;

    var NAVIGATION_LINK_SELECTOR = 'nav a';
    var MENU_BUTTON_SELECTOR = '.navbar-header button';
    var MOBILE_SCREEN_WIDTH = 768;

    var HERO_SECTION_SELECTOR = '#hero';
    var HERO_CONTENT_SELECTOR = '.content';
    var HERO_CONTENT_BUFFER = 10;

    var PORTFOLIO_SECTION_SELECTOR = '#portfolio';
    var PORTFOLIO_FILTERS_CONTAINER_SELECTOR = '.filters-container';
    var PORTFOLIO_FILTER_SELECTOR = '.filter';
    var ACTIVE_FILTER_CLASS = 'active';
    var ACTIVE_FILTER_SELECTOR = '.' + ACTIVE_FILTER_CLASS;
    var NO_BORDER_FILTER_CLASS = 'no-border';
    var PORTFOLIO_CONTENT_CONTAINER_SELECTOR = '.portfolio-container';

    $document.ready(function () {

        initNavScrollTo();

        initMobileNavButtonClick();

        initHeroSectionContent();

        initPortfolioSectionContent();

    });

    function initNavScrollTo() {
        // taken from... https://css-tricks.com/snippets/jquery/smooth-scrolling/ ... with tweaks
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - SCROLL_OFFSET
                    }, 1000);
                    return false;
                }
            }
        });
    }
    
    function initMobileNavButtonClick() {
        var $navLinks = $(NAVIGATION_LINK_SELECTOR);
        var $navMenuButton = $(MENU_BUTTON_SELECTOR);

        $navLinks.click(function(){
            if(window.innerWidth < MOBILE_SCREEN_WIDTH) {
                $navMenuButton.click();
            }
        });
    }

    function initHeroSectionContent() {
        var $heroSection = $(HERO_SECTION_SELECTOR);
        var $heroContent = $heroSection.find(HERO_CONTENT_SELECTOR);

        calculateAndSetContentPosition();
        fadeInContent();
        initResizeHandler();

        function calculateAndSetContentPosition() {
            var heroSectionHeight = $heroSection.outerHeight();
            var heroContentHeight = $heroContent.outerHeight();
            var heroContentPosition = ( heroSectionHeight / 2 ) - heroContentHeight - HERO_CONTENT_BUFFER;
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
    
    function initPortfolioSectionContent() {
        var $portfolioSection = $(PORTFOLIO_SECTION_SELECTOR);
        var $portfolioFiltersContainer = $portfolioSection.find(PORTFOLIO_FILTERS_CONTAINER_SELECTOR);
        var $portfolioFilters = $portfolioFiltersContainer.find(PORTFOLIO_FILTER_SELECTOR);
        var $portfolioContentContainer = $portfolioSection.find(PORTFOLIO_CONTENT_CONTAINER_SELECTOR);

        initMixItUpPlugin();
        setupFiltersOnHoverEvent();

        function initMixItUpPlugin() {
            $portfolioContentContainer.mixItUp();
        }

        function setupFiltersOnHoverEvent() {
            $portfolioFilters.hover(
                function() {    // hover in
                    var $hoveredFilter = $(this);
                    var isActive = $hoveredFilter.hasClass(ACTIVE_FILTER_CLASS);
                    if(!isActive){
                        var $activeFilter = $portfolioFilters.filter(ACTIVE_FILTER_SELECTOR);
                        $activeFilter.addClass(NO_BORDER_FILTER_CLASS);
                    }
                },

                function() {    // hover out
                    $portfolioFilters.removeClass(NO_BORDER_FILTER_CLASS);
                }
            );
        }
    }

})(jQuery);
