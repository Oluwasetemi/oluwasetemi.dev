---
title: git with hub like github-part-2
date: '2021-02-12T11:34:00.012Z'
tags: ['learning', 'git', 'hub']
isPublished: false
isDraft: false
modified: false
---

<!-- caution -->
## caution

Before you travel too deep, this article will be of great benefit if you have little experience on how to write code and it is not an introductory guide to `git` nor is it a starter guide to `GitHub`.

Today (12th February, 2021), I learnt about `hub fetch`, `hub init`, `hub merge`, `hub push`, `hub remote`, and `hub submodule`. let me share what I learnt with you.

- `hub fetch` - Add missing remotes prior to performing git fetch.

```sh
hub am --ignore-whitespace https://github.com/davidbalbert/hub/commit/fdb9921
# downloads patch via API
git am --ignore-whitespace /tmp/fdb9921.patch
```

- `hub init` - Initialize a git repository and add a remote pointing to GitHub.

```sh
git diff > mypatch.patch

git diff --cached > mypatch.patch

git apply mypatch.patch

# you can curl a patch from a github pr
curl https://github.com/username/repo/pull/pullNo.patch -o /tmp/55.patch
git apply /tmp/55.patch
```

NB -  The fork and pull request model of GitHub is a replacement for the patch model of change distribution. So I believe patches are only useful outside the context of tools like GitHub.

- `hub merge` - Merge a pull request locally with a message like the GitHub Merge Button.

```sh
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

- `hub push` - Push a git branch to each of the listed remotes.

```sh
hub cherry-pick http://github.com/username/repo/commit/SHA
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

- `hub remote` - Add a git remote for a GitHub repository.

```sh
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

- `hub submodule` - Add a git submodule for a GitHub repository.

```sh
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
