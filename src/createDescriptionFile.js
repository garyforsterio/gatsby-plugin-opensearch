import { promises as fs } from 'fs';
import xmlescape from 'xml-escape';

export const createDescriptionFile = (
  outputFile,
  { shortName, description, siteUrl, searchTemplate, searchForm }
) =>
  fs.writeFile(
    outputFile,
    `<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
<ShortName>${xmlescape(shortName)}</ShortName>
<Description>${xmlescape(description)}</Description>
<InputEncoding>UTF-8</InputEncoding>
<Url type="text/html" method="get" template="${xmlescape(
      siteUrl + searchTemplate
    )}"/>
<moz:SearchForm>${xmlescape(siteUrl + searchForm)}</moz:SearchForm>
</OpenSearchDescription>`
  );
