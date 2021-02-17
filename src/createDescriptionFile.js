import { promises as fs } from 'fs';

export function createDescriptionFile(
  outputFile,
  {
    shortName,
    description,
    siteUrl,
    searchPathname,
    searchFormPathname,
    params,
  }
) {
  return fs.writeFile(
    outputFile,
    `<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
  <ShortName>${shortName}</ShortName>
  <Description>${description}</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Url type="text/html" template="${siteUrl}${searchPathname}">
    ${params.map(
      ({ name, value }) => `<Param name="${name}" value="${value}"/>`
    )}
  </Url>
  <moz:SearchForm>${siteUrl}${searchFormPathname}</moz:SearchForm>
</OpenSearchDescription>`
  );
}
