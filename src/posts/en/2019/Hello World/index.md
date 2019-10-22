---
language: english
title: Hello World
date: "2019-08-19"
layout: post
demo: "false"
path: "hello-world"
category: "articles-en"
tags:
    - About me
    - Blogging
    - Building a Website
---

One of the things I like to do is to think. It's more than just that - thinking is instinctive, uncontrollable, inevitable. My thinking often leads nowhere. I can run around my mind pondering meaningless and pointless topics, or come up mostly with thoughts concerning my own self. Other times though, I come up with what seems to me as insightful thoughts. My initial urge is to document those insights, but my ultimate goal becomes sharing them with others.

In the past few months I was taking a break from work, so I found myself spending quite some time on social media commenting mostly about... well, social issues. In many cases I had already known exactly what I wanted to say in reply, but at times these online discussions made me feel as though the basis for my own views is not completely clear to me. Given all the spare time I had, I spent a big part of it reading and delving into core concepts in philosophy, science and mathematics, and this had given rise to even more insights I wanted to share with others.

Before all of that, beginning at a young age, I was spending a lot of time playing video games. I still do. At first I didn't spend too much thought about it, but the older I've become the more I developed a taste and an opinion about video games and gaming as a whole, and I've been wanting to share those as well. Much of this goes for other types of media too, such as movies and TV shows.

Sure, I have shared my thoughts and opinions about these topics with people in the past; friends, co-workers and strangers on online forums. But there is a difference between a casual conversation and a written article. In an article, I get to choose what to put an emphasis on. I get to choose how to best present my views. I get to think more before I speak and examine what I'm about to say. Casual conversations are great and are very important to me, but I realized how much sharing my thoughts using essays is just as important to me.

## So you want to write a blog?

Well... yes and no. Thinking is easy, but writing is hard; thinking is intuitive, writing is an acquired skill. What's more, writing is a lot easier when it comes as a part of a discussion, where the context is already laid out and you have a clear vision of what it is you want to say _in reply_ to something else that has been said. In contrast, writing from scratch about a new topic and potentially starting a conversation is much harder.

Hard is not impossible, but it could be just that if you approach it the wrong way. The right approach, I believe, is to tackle your goal one step at a time. I want to write a blog, yes, but if I'll simply start writing about all those topics I wanted to I'll probably exhaust myself and stop writing at once. I need to start by writing about topics I'm more used to write about, topics in which I have a clear idea of what I want to convey.

It just so happens that I'm a software developer and that I have enough experience to have come up with ideas, concepts and techniques that I can write about. In fact writing about technical topics can often help you deepen your understanding of them, and that is something I always strive for. So yes, I want to write a blog, and I'll start by writing mostly about my profession and occupation -- software development.

In case you were wondering, the topic for this article -- _Hello World_ -- is the name of the first program people usually write in a given programming language. I thought it would be fitting to name my first article the same way.

## Did you build this website just for a blog?

I did, but not at first. There are plenty of other ways to create a blog that require much less of an effort, and I have given thought and tried using some of them before deciding to make an entirely new website.

### Medium

First there is [Medium](https://medium.com), a blogging platform that is very popular among technical writers. It features a simple WYSIWYG editor [^1], integrates well with code-blocks, and -- perhaps most notably -- it already has a large reader base that can help new bloggers extend their reach. What Medium is missing, and what bothered me the most about it, is the lack of personalization.

When I read a post that I like I would often be able to recollect where I've read it; visually, that is. If I need to search that post again -- and I often do -- it's much easier to find it if I can also identify the site's visual signature. I may also stumble upon new posts from that website and then remember that I already liked a post on it, so I'll know that I am more likely to be interested in those new posts. I want my readers to have a similar experience with my posts, and that is why Medium was not very appealing to me.

### WordPress

After dismissing the idea of hosting my blog on a public platform, I went on to try and build my blog using what is probably the most popular blogging framework nowadays - [WordPress](https://wordpress.org). In fact it's not just a framework for blogging, but rather it can manage all kinds of digital content; hence, [Content Management System](https://en.wikipedia.org/wiki/Content_management_system), or CMS for short. Unlike Medium, WordPress allows for quite a lot of customization, both visual and functional, which is exactly what I was looking for in my blog.

The thing about all of this additional customization is that i wanted to be able to back it up along with my content. Even  more so, being a software developer I'm used to not just backing up my work, but also to version it via Git and have access to an automated process for deploying changes. WordPress does have pretty good support for content backups, but versioning of content and configuration along with an automated deployment process is not available out of the box, even with all the WordPress hosting services out there. To have these abilities, I needed command-line access via SSH, which means I had to self-host a WordPress instance on my own server.

That might sound like a lot of work just for a blog, and indeed it is, but I wasn't aware of it at first. One of the greatest challenges in versioning WordPress customization is the fact that it's persisted on a live database instead of plain files, and despite having a standard schema, many plugins model their data in non-standard ways. Given how popular WordPress is, I imagined there must already be a solution to this problem, and [in fact there is](https://versionpress.com), but that solution is experimental and not quite "battle-proven". I tried to come up with my own implementation of versioning and automatically deploying my changes, but that turned out to be a far more complicated task than I had anticipated, and eventually, I gave up on WordPress.

### Gatsby

After giving up on both Medium and WordPress I had dropped the idea of starting a blog for a while, but then I stumbled upon [Gatsby](https://www.gatsbyjs.org), a static site generator. Actually, that wasn't the first time I heard of it, as it did come up when I first looked for a blogging solution. Thing is, I was initially given the impression that Gatsby doesn't have a free and ad-less solution for integrating comments, but when I inspected it the second time around I realized that in fact there are such solutions -- less elegant than other platforms perhaps, but solid solutions nonetheless.

I started by completing the guides on the official Gatsby website, and I soon discovered how easy it is to set up a new website, version its code and content with Git, and seamlessly deploy it on a publicly hosted server - and all of this for free!

Not only that, but Gatsby generates and statically stores of all the site's content beforehand. This is unlike other platforms that query and render the content dynamically per request. Obviously, there is some content that must remain dynamic -- such as comments -- but the bulk of the website is static, making it extremely fast to browse.

The downside with Gatsby and other static site generators is that unless you want to have a very simplistic website, you pretty much have to implement a lot of features and design it on your own. Luckily for me, I am a software developer, so that shouldn't have been too hard for me. Moreover, I've never built a website before and have almost no experience with web technologies -- such as JavaScript, HTML and CSS -- so this was a really good opportunity for me to learn new skills.

## And that's it?

That's it. I built my personal blog and it's what you're looking at right now. It took me about three months and quite some work, but I learned a lot and even had the chance to contribute to Gatsby (it is an open-source project after all). In fact I hope to share some of the more technical insights I gathered while building the website.

So stay tuned, and of course, **welcome aboard!** I hope you'll enjoy the reading :)

[^1]: "What You See Is What You Get" editor is any editor in which the edited version is almost identical to the final version -- whether printed or displayed online.

  For example, Microsoft Word is such an editor.