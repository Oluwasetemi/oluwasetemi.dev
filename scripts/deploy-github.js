const ghpages = require('gh-pages')

// replace with your repo url
// not used anymore
ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: 'https://github.com/oluwasetemi/oluwasetemi.dev.git',
  },
  () => {
    console.log('Deploy Complete!')
  }
)
