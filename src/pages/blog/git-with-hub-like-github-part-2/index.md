---

title: git with hub like github part 2
date: '2021-03-18T11:34:00.012Z'
tags: ['learning', 'git', 'hub']
isPublished: true
isDraft: false
modified: false
---



Wrote the first Draft - Today (12th February, 2021), **It turned out that I completed this post 18th March and I have found out that hub is no more in production just for one of the maintainer [Mislav Marohnić](https://twitter.com/mislav) who is kind and diligent to look through issues and pull-request. He is a member of another team working on something very interesting called the [official GitHub command line](https://cli.github.com) and the [GitHub repo](https://github.com/cli/cli/)**. Seeing so much how `hub` has improved my workflow - saved me a couple of seconds. (I will also read the docs and incorporate it to my workflow and write about it).  I learnt about `hub fetch`, `hub init`, `hub merge`, `hub push`, `hub remote`, and `hub submodule`. let me share what I learnt with you.

> caution
>Before you travel too deep, this article will be of great benefit if you have some experience >on how to write code and this is not an introductory guide to `git` nor is it a starter guide to `GitHub`.

## `hub fetch`

Add missing remotes prior to performing git fetch. Allow space separated list of remotes you want to fetch with a flag (--multiple). You can update more than one remote with a single command.

```sh
hub fetch <remote-name>
# equivalent with GitHub
# add the remote-name and fetch the remote-name
git remote add <remote-name> <github-url>
git fetch <remote-name>
# update more than one remote
hub fetch staging oluwasetemi/feature oluwasetemi/test
```

## `hub init`

Initialize a git repository and add a remote pointing to GitHub.By the time you run the command , it would have run `git init`, `git remote add`

```sh
hub init -g

# git equivalent
git init && git remote add <remotename> <url>
```

WISH -  I wish I could get a command that initialize git and create a repository straight away. it would run `hub init -g; hub create`.

## `hub merge`

Merge a pull request locally with a message like the GitHub Merge Button. The remotes will be updated back once you push the local code online with `hub sync` or `hub fetch` or `hub push`. This can be done locally by fetching the latest HEAD with `git fetch` then into the branch of choice with the trademark GitHub text like `Merge pull request #Number from branch ....`. Hub is very beautiful and it simplify the process most especially if you do not want to leave your command-line interface.

```sh
hub merge <pull-request-url>
```

NB if you need a command to actually merge a GitHub pr then check Mislav [hub-api-utilities](https://github.com/mislav/hub-api-utils) - the `hub-pr-merge` has saved me ton of time.

This command will merge the pull request on the url to your current branch with a GitHub default like message. If you push the branch then the pull request status will be turned to merged.

## `hub push`

Push a git branch to each of the listed remotes.Accept more than one listed remote.

```sh
hub push <remote>, <remote2>

# git equivalent is running git push <remote> <remote2>
```

## `hub remote`

Add a git remote for a GitHub repository.The only difference from the custom git remote is the api i.e you only add the remote name as against the remote url with git. So it means the hub goes to GitHub and find the remote you're inferring and it is added.

```sh
hub remote add <remote-name>

# git equivalent
git remote add <remote-name> <remote-url>
```

## `hub submodule`

Add a git submodule for a GitHub repository.What is a submodule? Submodules are Git repositories nested inside a parent Git repository at a specific path in the parent repository's working directory. I am not so familiar with using `git submodule`.

```sh
hub submodule add <submodule-path>

# also the same as
git submodule add <parent-url> <submodule-path>
```

MORE to follow on hub `alias,api,browse,ci-status,compare,create,fork,gist,pull-request,pr,issue,release,sync`. The special thing that this commands bring is they are completely new to `git` and it offers GitHub features in commands we can use easily add to our workflow.

## `hub alias`

Show shell instructions for wrapping git. Understanding that hub wrapping `git` gives us an extended functionality of `git` as it relates to GitHub.

```sh
hub alias
hub alias -s
# this will show the output suitable for eval i.e output you can add to bashrc or zshrc files
```

## `hub api`

Low-level GitHub API request interface. This is so powerful that you have the power to extend any functionality that the GitHub api provides easily by passing the route excluding the `baseUrl=https://api.github.com`.

```sh
# List collaborators:
hub api repos/:user/:repo/collaborators | jq ".[].login"
# Add collaborator:
hub api -X PUT repos/:user/:repo/collaborators/:new_collaborator
# Remove collaborator:
hub api -X DELETE repos/:user/:repo/collaborators/:collaborator

# Verify collaborator:
hub api repos/:user/:repo/collaborators/:collaborator -i | grep "Status: 204" && echo yes || echo no
```

NB - the power of the api can be found in `hub-api-utils`. It was used to build command line scripts that can rename GitHub, merge PR like you are on GitHub and so on.

## `hub browse`

This will open a GitHub repository in a web browser. Do you struggle to remember the GitHub url of some of your projects? Do you always need to run `git remote -v` or go to GitHub and manually locate your GitHub repositories? The is a game changer I mean right from your terminal and boom you right on your githubUr page and most important is how you can use -- command flag to attach with `issues` or `pr`. Check the examples below for more clarification when dealing with issues and pr. Another thing is the option to pass specific COMMIT SHA to open to a GitHub commit directly.

```sh
hub browse
# open https://github.com/YOUR_USER/CURRENT_REPO

hub browse -- commit/SHA
# open https://github.com/YOUR_USER/CURRENT_REPO/commit/SHA

hub browse -- issues
# open https://github.com/YOUR_USER/CURRENT_REPO/issues

hub browse -- issues/10
# open https://github.com/YOUR_USER/CURRENT_REPO/issues/10

hub browse schacon/ticgit
# open https://github.com/schacon/ticgit

hub browse schacon/ticgit commit/SHA
# open https://github.com/schacon/ticgit/commit/SHA

hub browse resque
# open https://github.com/YOUR_USER/resque

hub browse resque network
# open https://github.com/YOUR_USER/resque/network
```

- `hub ci-status` - This will help to display status of GitHub checks for a commit if it run any form of ci like GitHub actions and the likes.

```sh
hub ci-status [commit]
# (prints CI state of commit and exits with appropriate code)
# One of: success (0), error (1), failure (1), pending (2), no status (3)
```

## `hub compare`

Open a GitHub compare page in a web browser. Compare a branch with the default branch or compare tags and releases

```sh
# compares refactor with the default branch
hub compare refactor
# open https://github.com/CURRENT_REPO/compare/refactor

hub compare 1.0..1.1
# open https://github.com/CURRENT_REPO/compare/1.0...1.1

# u flag prints the url of the GitHub compare
hub compare -u fix
# (https://github.com/CURRENT_REPO/compare/fix)

# compares a user's patch with the default
hub compare other-user patch
# open https://github.com/other-user/REPO/compare/patch
```

## `hub create`

Create a new repository on GitHub and add a git remote for it. It is as simple as that. If you have even tried to setup your code on GitHub then you will appreciate this one line command to create a GitHub repository.

```sh
hub create <reponame>
# if reponame is not added then the name of the folder is used
[ repo created on GitHub ]
git remote add origin git@github.com:YOUR_USER/CURRENT_REPO.git

# with description:
hub create -d 'It shall be mine, all mine!'

hub create recipes
[ repo created on GitHub ]
git remote add origin git@github.com:YOUR_USER/recipes.git

hub create sinatra/recipes
[ repo created in GitHub organization ]
git remote add origin git@github.com:sinatra/recipes.git
```

## `hub delete`

Delete a repository on GitHub.

```sh
hub delete reponame

hub delete ORG/reponame -y
# the yes flag is to skip the prompt asking yes/No
```

## `hub fork`

Fork the current repository on GitHub and add a git remote for it.

```sh
hub fork
# user manually doing this will have to run the following steps below
[ repo forked on GitHub ]
git remote add -f YOUR_USER git@github.com:YOUR_USER/CURRENT_REPO.git
```

## `hub gist`

Create and print GitHub Gists. This is my most loved of all the commands.The easy access to share code inform of gist is real super power.Imagine this scenario where you are working on a codebase or sample and you really quickly want to share with someone online or a tweet. Then you can run the hub gist command as against copying the code from your IDE to the GitHub gist website. You can access all the powers of GitHub gists. Do you know you can use `npx` to run gists? even when npm packages. I will write about how to do that and share the url as well.

```sh
hub gist create test.graphql
# this command looks for a test.graphql file and put it into a git with a public shareable link
```

## `hub pull-request`

Create a GitHub Pull Request whether from standard input of file or default editor you can created a pull request without going to GitHub.Examples of commands to create Pull Requests.

```sh
# while on a topic branch called "feature":
hub pull-request
[ opens text editor to edit title & body for the request ]
[ opened pull request on GitHub for "YOUR_USER:feature" ]

# explicit title, pull base & head:
$ hub pull-request -m "pull request title " -b base-branch -h feature-branch
```

- `hub pr` - Manage GitHub Pull Requests for the current repository. List , checkout and show pr using this command.

```sh
# will list all the pr on the repository
hub pr list

# check the hub checkout
hub pr checkout #pr-number


# opens a pr page in the web browser
hub pr show #pr-number

```

## `hub issue`

Manage GitHub Issues for the current repository. This gives you the power to show, create, update,labels, transfer issues as necessary to you. It follows almost the same principles of `pr` and `pull-request` i.e the showing with issue number, creating with -m "test" or standard input or text editor, listing all the available issues.

```sh
hub issue list

hub issue show #issue-number

hub issue update #issue-number

hub issue label #issue-number label

hub issue transfer #issue-number destination details

hub issue create
```

## `hub release`

Manage GitHub Releases for the current repository. You have the power to show, create, edit, download, delete release of your software on GitHub. I have not use this aspect of GitHub closely so I don't have any examples but I know it follows the hub standard of creating, listing, edit and delete.

## `hub sync`

Fetch git objects from upstream and update local branches.

```sh
hub sync
```

This brings me to the end of this learning. Other tools I have been checking out lately is the [jq - json command line processor](https://stedolan.github.io/jq/) and [GitHub cli](https://github.com/cli/cli).

Thank you for checking it out.
