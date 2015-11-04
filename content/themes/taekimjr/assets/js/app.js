/**
 * Main JS file for Tae Kim JR Blog behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    var SCROLL_OFFSET = 75;
    var ANIMATION_TIMER = 500;

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

    var JOURNAL_SECTION_SELECTOR = '#journal';
    var BUTTON_CONTAINER_SELECTOR = '.more-articles';
    var PREV_ARTICLE_BUTTON_SELECTOR = '.prev';
    var NEXT_ARTICLE_BUTTON_SELECTOR = '.next';
    var ARTICLES_CONTAINER_SELECTOR = '.articles-container';
    var HIDDEN_ARTICLES_CONTAINER_SELECTOR = '.hidden-articles-container';
    var NEXT_ARTICLES_CONTAINER_SELECTOR = '#article-content';

    $document.ready(function () {

        initNavScrollTo();

        initMobileNavButtonClick();

        initHeroSectionContent();

        initPortfolioSectionContent();

        initJournalSectionArticleLoader();

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
    
    function initJournalSectionArticleLoader() {
        var $journalSection = $(JOURNAL_SECTION_SELECTOR);
        var $articlesButtonContainer = $journalSection.find(BUTTON_CONTAINER_SELECTOR);
        var $prevArticlesButton = $articlesButtonContainer.find(PREV_ARTICLE_BUTTON_SELECTOR);
        var $nextArticlesButton = $articlesButtonContainer.find(NEXT_ARTICLE_BUTTON_SELECTOR);
        var $articlesContainer = $journalSection.find(ARTICLES_CONTAINER_SELECTOR);
        var $hiddenArticlesContainer = $journalSection.find(HIDDEN_ARTICLES_CONTAINER_SELECTOR);

        var currentPage = 1;

        setupPrevButtonOnClickEvent();
        setupNextButtonOnClickEvent();

        function setupPrevButtonOnClickEvent() {
            $prevArticlesButton.click(prevArticles);
        }

        function prevArticles() {
            hideButtons();
            currentPage--;

            $articlesContainer.fadeOut(ANIMATION_TIMER, function(){
                saveNextArticles();
                getPrevArticles();
            });
        }
        
        function saveNextArticles() {
            $hiddenArticlesContainer.html($articlesContainer.html());
        }
        
        function getPrevArticles() {
            // Hidden articles container will hold next page's articles
            $articlesContainer.load( "page/" + currentPage + " " + NEXT_ARTICLES_CONTAINER_SELECTOR, function(){
                showButtons();
                $articlesContainer.fadeIn(ANIMATION_TIMER);
            });
        }

        function setupNextButtonOnClickEvent() {
            getNextArticles(); // sets up for next button click
            $nextArticlesButton.click(nextArticles);
        }
        
        function nextArticles() {
            hideButtons();
            currentPage++;

            $articlesContainer.fadeOut(ANIMATION_TIMER, function(){
                loadNewArticles();
                getNextArticles();
            });
        }
        
        function loadNewArticles() {
            $articlesContainer.html($hiddenArticlesContainer.html());
        }

        function getNextArticles() {
            // Hidden articles container will hold next page articles
            // also used to see if there are next articles
            var nextPage = currentPage + 1;
            $hiddenArticlesContainer.load( "page/" + nextPage + " " + NEXT_ARTICLES_CONTAINER_SELECTOR, function(){
                showButtons();
                $articlesContainer.fadeIn(ANIMATION_TIMER);
            });
        }
        
        function showButtons() {
            showHideNextButton();
            showHidePrevButton();
        }
        
        function hideButtons() {
            hideNextButton();
            hidePrevButton();
        }

        function showHideNextButton() {
            if(shouldShowNextButton()) {
                showNextButton();
            }
            else {
                hideNextButton();
            }
        }

        function shouldShowNextButton() {
            // compare current articles html with hidden articles html
            // if equal, there are no next articles
            var currentArticlesHTML = $.trim($articlesContainer.html());
            var nextArticlesHTML = $.trim($hiddenArticlesContainer.html());

            return currentArticlesHTML !== nextArticlesHTML;
        }
        
        function hideNextButton() {
            $nextArticlesButton.prop('disabled', true);
            $nextArticlesButton.fadeOut(ANIMATION_TIMER, function(){
                $nextArticlesButton.prop('disabled', false);
            });
        }
        
        function showNextButton() {
            $nextArticlesButton.fadeIn(ANIMATION_TIMER);
        }

        function showHidePrevButton() {
            if(shouldShowPrevButton()) {
                showPrevButton();
            }
            else {
                hidePrevButton();
            }
        }

        function shouldShowPrevButton() {
            return currentPage > 1;        // 2 === first page
        }

        function hidePrevButton() {
            $prevArticlesButton.prop('disabled', true);
            $prevArticlesButton.fadeOut(ANIMATION_TIMER, function(){
                $prevArticlesButton.prop('disabled', false);
            });
        }

        function showPrevButton() {
            $prevArticlesButton.fadeIn(ANIMATION_TIMER);
        }

    }

})(jQuery);
