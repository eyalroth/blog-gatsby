---
language: english
layout: post
demo: "false"
date: "2019-08-29T05"
title: "Gatsby - Part V: Images"
path: "gatsby-images"
category: "articles-en"
tags:
    - Web Development
    - Gatsby
    - React
    - JavaScript
    - CSS
series:
  path: "programming-with-gatsby"
  name: "Programming with Gatsby"
  order: 5
---

PROFILE IMAGE
- dragging
	- mouse
		- up/down detection
		- different div for "up/down" and "up"
			- want to be able to release drag anywhere on the screen with "up" event
			- "up" div stretches across the entire screen
				- but the event listener is added only after drag has initiated (with "down")
			- "up" event is still listened on "up/down" div because it has a higher z-index

	- touch - pretty straight forward
	- https://github.com/gatsbyjs/gatsby/issues/14034

FEATURED IMAGE
- annotate markdown
- works with: facebook, twitter, other?
- default image
	- cropped at 1315:690 (1.91 ratio)
- facebook
	- og:
	- need to know image type
- twitter
	- twitter:

FINAL WORDS
?