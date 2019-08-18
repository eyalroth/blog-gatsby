<p align="center">
  <a href="https://eyalroth.com">
    <img alt="Eyal Roth" src="src/images/icon2.png" width="125" />
  </a>
</p>
<h1 align="center">
  Eyal Roth's blog
</h1>

This is the repository for my blog at [eyalroth.com](https://eyalroth.com), containing both the code and content of the website.

 It is built with [GatsbyJS](https://github.com/gatsbyjs/gatsby), based on the starter site [Lumen 2](https://github.com/GatsbyCentral/gatsby-v2-starter-lumen), and hosted on [Netlify](https://www.netlify.com/).

 [![Maintainability](https://api.codeclimate.com/v1/badges/bf2409966a6163ad2b9e/maintainability)](https://codeclimate.com/github/eyalroth/blog-gatsby/maintainability) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/eyalroth/blog-gatsby/blob/master/LICENSE) [![CC license](https://i.creativecommons.org/l/by/4.0/80x15.png)](http://creativecommons.org/licenses/by/4.0/)

## Features

### Structure

+ Minimal homepage.
+ Simplistic 404 page.
+ About page.
+ Blog posts.
+ Multiple languages - English (left to right) and Hebrew (right to left).

### Layout

+ Sidebar with author information (image, name, title and contact links); becomes a floating topbar with collapsible components on smaller screens (mobile).
+ Site navigation menu with an animated slider component (part of the sidebar).
+ Light / dark theme (toggle button in the sidebar, persisted via a cookie).
+ Reading progress bar / scroll indication at the top of the page.
+ Persistent footer across the entire site.
+ Well suited for desktop and mobile use alike; multiple breakpoints for multiple screen sizes.
+ Adjusted for window resizing and screen orientation switch.

### Posts

+ Post list pages by category, ordered by time.
+ Comments via [utteranc.es](https://utteranc.es/) (hosted on [eyalroth/blog-gatsby-comments](https://github.com/eyalroth/blog-gatsby-comments)).
+ Code blocks syntax highlighting with [PrismJS](https://prismjs.com/).
+ Footnotes styling with [littlefoot.js](https://github.com/goblindegook/littlefoot).
+ Reading time estimation.
+ Metadata tags (*not* indexed, only for presentation).
+ Social sharing buttons / mobile share integration.
+ Series of posts - posts in a series can be navigated from one another and have their own unique post list page.
 
### Technical

+ RSS feed (one for each language).
+ `sitemap.xml` and `robots.txt`.
+ Google analytics integration.
+ Offline support via [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).
+ [WPA](https://en.wikipedia.org/wiki/Progressive_web_applications) integration via [manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).

### Easter eggs

+ Dragging the author image reveals another image. 

## Known issues

### Comments

+ Right-to-left comments are directed and aligned to the left.
This is caused due to [lack of builtin RTL support in GitHub comments](https://github.com/dear-github/dear-github/issues/1470).
The workaround is to instruct users to use HTML tags in their comments.

### Profile image

+ Dragging the profile image is sometimes glitchy, especially on desktop.
I didn't make too much of an effort to correct that,
seeing that even major websites such as YouTube and Twitch.tv exhibit a glitchy volume controller in their player.
+ Dragging the profile image doesn't work on tablets for some reason, only double-clicking does.

### Unicode

+ Pages with unicode in their URL fail to load properly in Edge browser.


### Featured post image

+ You must have at least one markdown file with the `featuredImage` metadata field, otherwise post pages will fail to compile.
See [this Gatsby issue](https://github.com/gatsbyjs/gatsby/issues/2392) for more information.

## Build

### Local development

The site is built with Gatsby which provides both a local development server (`gatsby develop`) and local serving capabilities (`gatsby build && gatsby serve`).

It should be possible to develop on any OS; I myself have been developing this site using [WSL on Windows 10](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux).

### Deployment

The site is not only hosted on Netlify, but is also built and deployed via Netlify's CI / CD, which is connected directly to this repository and uses Gatsby's tools to build the site.

### Environment variables

The site uses several environment variables during its build process:
 + `URL` - the site's URL.
 + `GOOGLE_ANALYTICS` - the Google Analytics site ID.
 + `UTTERANCES_REPO` - the path (not entire URL) of the GitHub repository containing the [utteranc.es](https://utteranc.es/) comments / issues (it is useful to use one for development purposes and one for production).
 + `AUTO_RELOAD` - determines whether the service worker should automatically reload the browser's page upon detecting site updates; if set to `false`, the site will prompt a window asking the user for permission to reload the site (useful when testing a staging site and wanting to make sure updates have been deployed and served locally).

Note the [`.env.development`](.env.development) file which sets these variables for development mode (`gatsby develop`). There is no such file for "production" mode (`gatsby build`) and they have to be set manually (via `export`).

Also note the [`netlify.toml`](netlify.toml) file which configures some of these variables on Netlify CI (`URL` is automatically set by Netlify). 

## Compatibility

The site is compatible with all modern browsers. It is *not* compatible with Internet Explorer (the site will not load and instead will display a message saying just that).

## Testing

There are no automatic tests for the site.

It was manually tested by me and mostly on:
+ Windows 10 + Chrome.
+ Android smartphone (Galaxy S7) + Chrome.
+ Android tablet (Samsung Tab S3) + Chrome.

It was also partially tested on:
* Windows 10 + Firefox.
* Windows 10 + Edge.

It was *not* tested on any Apple product (Mac / iPad / iPhone) as I do not own any of these. 

## Link structure

Language prefixes are either `en` (English) or `he` (Hebrew).

### Home
+ `/{lang}` - home page for each language.
+ `/` redirects to `/en`.

### Blog
+ `/blog/{year}/{month}/{name}` - blog post page (no language in the permalink). These links are intended to never change; hence, a permalink.
+ `/{lang}/blog/{category}` - post list page for every language's category.
+ `/blog` redirects to the main English category page.
+ `/blog/series/{series-name}` - post series list page. 

### Other
+ `/{lang}/about`- about page for each language.
+ `/404` - 404 Page.
+ `/{lang}/rss.xml` - RSS feed for each language.
+ `/rss.xml` redirects to `/en/rss.xml`.

## Inspiration

The design and structure of this site draw much inspiration from many other sites out there, so here's a shout-out to them:
+ [danielwestheide.com](https://danielwestheide.com)
+ [knpw.rs](https://knpw.rs)
+ [sean.is](https://sean.is)
+ [ramonchancay.me](https://ramonchancay.me)
+ [theleakycauldronblog.com](https://theleakycauldronblog.com)
+ [chadly.net](https://chadly.net)
+ [starikov.dev](https://starikov.dev)
+ [tinney.dev](https://tinney.dev/)
+ [unbackend.pro](https://www.unbackend.pro/)
+ [szafranek.net](https://szafranek.net/)
+ [waitbutwhy.com](https://waitbutwhy.com/)
+ [joelonsoftware.com](https://www.joelonsoftware.com)
+ [webmasters.googleblog.com](https://webmasters.googleblog.com/)
+ [blog.google](https://www.blog.google/)
+ [github.blog](https://github.blog/)
+ [newsroom.fb.com](https://newsroom.fb.com/)

## License  

The content of this project itself is licensed under the [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/), and the underlying source code used to format and display that content is licensed under the [MIT license](LICENSE).