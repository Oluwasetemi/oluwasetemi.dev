module.exports = {
  title: '{...OOS}', // Navigation and Site Title
  siteTitleAlt: 'The personal website of Oluwasetemi Ojo', // Alternative Site title for SEO
  siteTitleShort: 'oluwasetemi', // short_name for manifest
  siteUrl: process.env.ROOT_URL || 'https://oluwasetemi.dev', // Domain of your site. No trailing slash!
  lang: 'en', // Language Tag on <html> element
  pathPrefix: '/',
  siteLogo: 'images/logo.png', // Used for SEO and manifest, path to your image you placed in the 'static' folder
  siteDescription:
    'Come check out how Oluwasetemi Ojo can help you level up your career as a software engineer.',
  minibio: `
    <strong>Oluwasetemi Ojo</strong> is a JavaScript software engineer and
    teacher. He's taught hundreds of thousands of people how to make the world
    a better place with quality software development tools and practices.
  `,
  author: 'Oluwasetemi Ojo', // Author for schemaORGJSONLD
  organization: 'Oluwasetemi Ojo Tech LLC',

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@setemiojo', // Twitter Username
  ogSiteName: 'Oluwasetemi Ojo', // Facebook Site Name
  ogLanguage: 'en_US',

  // Manifest and Progress color
  themeColor: '#4147DC',
  backgroundColor: '#231C42',

  // Social component
  twitter: 'https://twitter.com/setemiojo/',
  twitterHandle: '@setemiojo',
  github: 'https://github.com/oluwasetemi/',
  linkedin: 'https://www.linkedin.com/in/setemiojo/',
  youtube: 'https://www.youtube.com/@setemiojo',
  rss: 'https://oluwasetemi.dev/blog/rss.xml',
}
