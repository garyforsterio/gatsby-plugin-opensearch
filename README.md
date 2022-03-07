# gatsby-plugin-opensearch

Create an OpenSearch description for your Gatsby site.

_NOTE: This plugin only generates output when run in `production` mode! To test your OpenSearch description, run: `gatsby build && gatsby serve`_

## Install

`npm install gatsby-plugin-opensearch`

## How to Use

```javascript
// In your gatsby-config.js
siteMetadata: {
  siteUrl: `https://www.example.com`,
},
plugins: [{
  resolve: `gatsby-plugin-opensearch`,
  options: {
    shortName: 'Github',
    description: 'Search Github',
    searchTemplate: '/search?q={searchTerms}',
    searchForm: '/search',
  },
}]
```

Above is the minimal configuration required to get started. The
generated OpenSearch description will be included on all of your site's pages.

For more information about OpenSearch can be found [here](https://developer.mozilla.org/en-US/docs/Web/OpenSearch).

## Options

The `defaultOptions` [here](./src/defaults.js) can be overridden.

The options are as follows:

- `output` (string) The filepath and name. Defaults to `/opensearch.xml`.
- `shortName` (string) A short name for the search engine. It must be 16 or fewer characters of plain text, with no HTML or other markup.
- `description` (string) A brief description of the search engine. It must be 1024 or fewer characters of plain text, with no HTML or other markup.
- `searchTemplate` (string) The pathname along with any required query parameters. Parameters to be populated should be wrapped in curly brackets (e.g. `{searchTerms}`). More details of available parameters can be found [here](https://github.com/dewitt/opensearch/blob/master/opensearch-1-1-draft-6.md#opensearch-11-parameters). This string will be appended to the `siteUrl` to generate the OpenSearch description file. Any characters which are invalid in XML must be escaped (e.g. & -> `&amp;`)
- `searchForm` (string) The pathname for the site's search page. This allows Firefox users to visit the site directly.
- `createLinkInHead` (boolean) Whether to populate the `<head>` of your site with a link to the OpenSearch description file. Defaults to true.
