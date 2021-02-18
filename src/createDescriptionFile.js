import { promises as fs } from 'fs';

export function createDescriptionFile(
  outputFile,
  { shortName, description, siteUrl, searchTemplate, searchForm }
) {
  return fs.writeFile(
    outputFile,
    `<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
<ShortName>${shortName}</ShortName>
<Description>${description}</Description>
<InputEncoding>UTF-8</InputEncoding>
<Url type="text/html" method="get" template="${siteUrl}${searchTemplate}"/>
<moz:SearchForm>${siteUrl}${searchForm}</moz:SearchForm>
</OpenSearchDescription>`
  );
}
