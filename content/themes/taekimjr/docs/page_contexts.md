#Page Contexts
==================
## home.hbs
Homepage of the entire website. This will be the entry point to all of the portfolio and blog content.

Portfolio with links to individual pages (page.hbs).

Journal with links to individual posts (post.hbs). There will be functionality to 'see more', which will call jQuery load method (http://api.jquery.com/load/) to grab more posts (/page/2/).

Contact footer at the bottom.

## index.hbs
This gives the ability to grab more posts (/page/2). 
example:
$( "#article-list" ).load( "/page/2 #content" );

## post.hbs
This will show the individual blog posts.

## page.hbs
This will show the individual portfolio items.

