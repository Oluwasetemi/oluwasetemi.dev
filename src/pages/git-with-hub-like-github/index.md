---
title: git with hub like github
date: '2020-11-05T00:00:00.012Z'
tags: ['learning', 'git', 'hub']
isPublished: false
isDraft: false
modified: false
---

The field is full of so much tools and you might be overwhelmed by a new release of every new tool out there. Just like when git came about the list of version control tools. I was not even a developer then, I mean I did not know who Chris Wanstrath, Tom Preston-Werner, P J Hyett, and Scott Chacon were and how there invention will change the way I will be working. What did they all invent that changed the way developers write code, build software and ship new releases of the written code. Git is a creation of Linus Trovalds in 2005 and GitHub was invented by the 4 brilliant developers mentioned above.

<!-- caution -->
## caution

Before you travel too deep, this article will be of great benefit if you have little experience on how to write code and it is not an introductory guide to `git` nor is it a starter guide to `GitHub`.

So what is the difference between `git` and `GitHub`? git was created by linus trovalds - (creator of linus operating system) to help manage the versions of softwares. Its a term called version control management or source control in software development cycle. Git is a distributed version control - It in simple terms help to manage the version of the code we write with things like branch, and commits.

GitHub is a software that bring `git` to developers and team alike on the web. A website where developers put their code. - A gift indeed to open source software development. It brings pull-request, remote branch, pushing, pulling, fork, clone terms to help in proper documentation of written code that becomes software and help with collaboration between a team of engineers.

I developed interest in learning git and github while I was in the university around 400L (2014). 9 years after the original invention of `git` and 6 years after GitHub came to life. Little did I know that it will change many things and it will become a requirement in getting software development jobs.

Ever since then I have tried to learn it, teach it to others and use it in writing code. I found out `hub` a new command line wrapper created to bring the functionalities of `GitHub` close to developers on the command line- so that we will not have to deal with the web interface every time when we need to interact with `GitHub`.

> Hub is a tool that wraps git in order to extend it with extra functionality that makes it better when working with GitHub.
> <https://hub.github.com>

Two major thing you should expect is `hub` extending the powers and functionality of `git` and giving us new commands that bring GitHub close to your terminal. EVerything you can do with hub can be done with git + GitHub web interface.

I am learning how to use `hub` and reading its documentation is the step I am taking and I will be sharing what I learn here.

To start with today (11th February, 2021), I learnt about `hub-am`, `hub-apply`, `hub-checkout`, `hub-cherry-pick`, and `hub-clone`. let me share what I learnt with you.

- `hub-am` - Replicate commits from a GitHub pull request locally.Imagine you have a pull request from a repository you are working with and you are wondering how to test the pr locally? I would do a checkout to the branch and it works just fine but `hub-am -3 <GitHub pull request url>` would do great work of bringing the code changes in the pr to you from GitHub. This is a great power. It work when with patch too. What is a patch right?(The next one `hub-apply` will explain more about patches). You can try it a commit url from GitHub.

```sh
hub am --ignore-whitespace https://github.com/davidbalbert/hub/commit/fdb9921
# downloads patch via API
git am --ignore-whitespace /tmp/fdb9921.patch
```

- `hub-apply` - Download a patch from GitHub and apply it locally.Patches in git is a small changes to a git working directory that can be added to any git working directory. Some made a change to a code they only have read access to, the only was to share the changes with anyone who has write access is to create a patch from the changes. A patch contains the file changes, commits and all necessary information that can be added to the git.

```sh
git diff > mypatch.patch

git diff --cached > mypatch.patch

git apply mypatch.patch

# you can curl a patch from a github pr
curl https://github.com/username/repo/pull/pullNo.patch -o /tmp/55.patch
git apply /tmp/55.patch
```

NB -  The fork and pull request model of GitHub is a replacement for the patch model of change distribution. So I believe patches are only useful outside the context of tools like GitHub.

- `hub-checkout` - Check out out the head of a pull request as a local branch.

- `hub-cherry-pick` - Cherry-pick a commit from a fork on GitHub.

- `hub-clone` - Clone a repository from GitHub
