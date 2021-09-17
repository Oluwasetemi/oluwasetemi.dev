<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [caution](#caution)
  - [configuring hub](#configuring-hub)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---
title: git with hub like github
date: '2021-02-12T11:34:00.012Z'
tags: ['learning', 'git', 'hub']
isPublished: true
isDraft: false
modified: false
---

The field is full of so much tools and you might be overwhelmed by a new release of every new tool out there. Just like when `git` came aboard the list of version control tools. I was not even a developer then, I mean I did not know who Chris Wanstrath, Tom Preston-Werner, P J Hyett, and Scott Chacon were and how their invention will change the way I will be working. What did they all invent that changed the way developers write code, build software and ship new releases of the written code. Git is a creation of Linus Trovalds in 2005 and GitHub was invented by the 4 brilliant developers mentioned above. Game changer money. (It was sold to microsoft later a very ridiculous amount of money). The brilliant thing is how it maintained its open source powers.

<!-- caution -->
## caution

Before you travel too deep, this article will be of great benefit if you have little experience on how to write code and it is not an introductory guide to `git` nor is it a starter guide to `GitHub`.

So what is the difference between `git` and `GitHub`? git was created by linus trovalds - (creator of linus operating system) to help manage the versions of softwares. Its a term called version control management or source control in software development cycle. Git is a distributed version control - It in simple terms helps to manage the version of the code we write with things like branch, and commits.

GitHub is a software that bring `git` to developers and team alike on the web. A website where developers put their code. - A gift indeed to open source software development. It brings pull-request, remote branch, pushing, pulling, fork, clone terms to help in proper documentation of written code that becomes software and help with collaboration between a team of engineers.

I developed interest in learning git and github while I was in the university around 400L (2014). 9 years after the original invention of `git` and 6 years after GitHub came to life. Little did I know that it will change many things and it will become a requirement in getting software development jobs.

Ever since then I have tried to learn it, teach it to others and use it in writing code. I found out `hub` a new command line wrapper created to bring the functionalities of `GitHub` close to developers on the command line- so that we will not have to deal with the web interface every time when we need to interact with `GitHub`.

> Hub is a tool that wraps git in order to extend it with extra functionality that makes it better when working with GitHub.
> <https://hub.github.com>

Two major thing you should expect is `hub` extending the powers and functionality of `git` and giving us new commands that bring GitHub close to your terminal. EVerything you can do with hub can be done with git + GitHub web interface.

I am learning how to use `hub` and reading its documentation is the step I am taking and I will be sharing what I learn here.

Let's get started with using `hub` in our various command line application by installing it. I use [hyper terminal](https://hyper.is) that run a `zsh` shell. The current operating system I am using is Mac OS with homebrew installed. To install `hub` with a similar operationg system and homebrew installed run the following commands to install `hub`. For more step on how to install `hub` on other operating system. check <https://github.com/github/hub>. One benefit of `hub` is its usage in your GitHub actions.

```shell
brew install Hub

# run a check to see if hub is installed and its version
hub version
```

Examples of task that you can do on `GitHub` that `hub` was created to make smooth. Its `GitHub` on the command line.

```shell
# cloning of repository
hub clone <url> or <name of the repo> - it sets the authenticated user github name as the default

# sync local with remotes
hub sync

#  working with issues and pr's
hub issues

hub pr

# opening github from terminal
hub browse -- issues

# creating gists
hub git create

# getting started with a new project
hub init -g
hub create

#  forking a repository
hub fork

# others like opening a pull request
hub pull-request
# the most powerful things are the low level stuffs you can do with `hub api`
# posting a comment with hub directly to GitHub with api
hub api repos/{owner}/{repo}/issues/123/comments --field body=@mycomment.txt
```

### configuring hub

hub will prompt for GitHub username and password the first time it needs to access the API and exchange it for an OAuth token, which it stores in `~/.config/hub`. You may avoid the prompt if you use `GITHUB_USER` and `GITHUB_PASSWORD` environment variables. You may alternatively provide GITHUB_TOKEN, an access token with repo permissions.

To start with today (11th February, 2021), I learnt about `hub am`, `hub apply`, `hub checkout`, `hub cherry-pick`, and `hub clone`. let me share what I learnt with you.

- `hub am` - Replicate commits from a GitHub pull request locally.Imagine you have a pull request from a repository you are working with and you are wondering how to test the pr locally? I would do a checkout to the branch during which you might want to run a git fetch to fetch all the necessary refspec and it works just fine but `hub am -3 <GitHub pull request url>` would do great work of bringing the code changes in the pr to you from GitHub. This is a great power. It work when with patch too. What is a patch right?(The next one `hub apply` will explain more about patches). You can try it with a commit url from GitHub.

```shell
hub am --ignore-whitespace https://github.com/davidbalbert/hub/commit/fdb9921
# downloads patch via API
git am --ignore-whitespace /tmp/fdb9921.patch
```

- `hub apply` - Download a patch from GitHub and apply it locally.Patches in git is a small changes to a git working directory that can be added to any git working directory. Someone made a change to a code they only have read access to, the only way to share the changes with anyone who has write access is to create a patch from the changes. A patch contains the file changes, commits and all necessary information that can be added to the git directory.

```shell
git diff > mypatch.patch

git diff --cached > mypatch.patch

git apply mypatch.patch

# you can curl a patch from a github pr
curl https://github.com/username/repo/pull/pullNo.patch -o /tmp/55.patch
git apply /tmp/55.patch
```

NB -  The fork and pull request model of GitHub is a replacement for the patch model of change distribution. So I believe patches are only useful outside the context of tools like GitHub.

- `hub checkout` - Check-out the head of a pull request as a local branch.Create a new branch locally from a GitHub pull request.It in essence pull the changes from a pull request to an existing or new branch.

```shell
hub checkout https://github.com/username/repo/pull/73
OR
# alternative method
git remote add -f -t branchName1 remoteName git://github.com/username/repo.git
# With -f option, git fetch <name> is run immediately after the remote information is set up.
# With -t <branch> option, instead of the default glob refspec for the remote to track all branches under the refs/remotes/<name>/ namespace, a refspec to track only <branch> is created. You can give more than one -t <branch> to track multiple branches without grabbing all branches.
git checkout --track -B newBranchName remote{origin/upstream}/<remote branch name>

# create a new local branch from a PR named custom-branch-name
hub checkout https://github.com/username/repo/pull/73 custom-branch-name
```

- `hub cherry-pick` - Cherry-pick a commit from a fork on GitHub.What the `git cherry-pick` does is to apply changes made in a commit SHA ID to the git working directory. It means what hub cherry-pick will offer you the developer is to cherry-pick a commit from GitHub and apply the changes to your code locally. it offers you lot of powers to experiment.

```shell
hub cherry-pick https://github.com/username/repo/commit/SHA
OR
git remote add -f remoteName git://github.com/username/REPO.git
git cherry-pick SHA

hub cherry-pick username@SHA
OR
# create a remote and fetch the remote immediately
git remote add -f branchName git://github.com/username/repo.git
git cherry-pick SHA

hub cherry-pick username@SHA
git fetch remoteName
git cherry-pick SHA
```

- `hub clone` - Clone a repository from GitHub. Consider the following commands.

```shell
hub clone schacon/ticgit
OR
git clone git://github.com/schacon/ticgit.git

hub clone -p schacon/ticgit
OR
git clone git@github.com:schacon/ticgit.git

# it defaults to your GitHub username
hub clone resque
git clone git@github.com/YOUR_USER/resque.git
```

SHA means a GitHub sha1 commit ID, either the for 6 digit or the full commit sha1 ID.

More to follow on as I learn.
