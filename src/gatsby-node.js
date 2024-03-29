import path, { join } from 'path';
import { createDescriptionFile } from './createDescriptionFile';
import { defaultOptions } from './config';

const publicPath = `./public`;

exports.onPostBuild = async ({ graphql }, pluginOptions) => {
  const { output, ...rest } = {
    ...defaultOptions,
    ...pluginOptions,
  };

  const { errors, data } = await graphql(`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  if (errors) {
    throw new Error(errors.join(`, `));
  }

  const siteUrl = data.site.siteMetadata.siteUrl;

  if (!siteUrl || siteUrl.trim().length == 0) {
    throw new Error(
      `SiteMetaData 'siteUrl' property is required and cannot be left empty.`
    );
  }

  const outputFile = path.join(publicPath, output);

  return createDescriptionFile(outputFile, { siteUrl, ...rest });
};

exports.pluginOptionsSchema = ({ Joi }) =>
  Joi.object().keys({
    output: Joi.string()
      .default(`/opensearch.xml`)
      .description(`The filepath and name`),
    createLinkInHead: Joi.boolean()
      .default(true)
      .description(
        `Whether to populate the \`<head>\` of your site with a link to the OpenSearch description.`
      ),
    shortName: Joi.string()
      .max(16)
      .required()
      .description(
        `A short name for the search engine. It must be 16 or fewer characters of plain text, with no HTML or other markup.`
      ),
    description: Joi.string()
      .max(1024)
      .required()
      .description(
        `A brief description of the search engine. It must be 1024 or fewer characters of plain text, with no HTML or other markup.`
      ),
    searchTemplate: Joi.string()
      .required()
      .description(
        'The pathname along with any required query parameters to be populated.'
      ),
    searchForm: Joi.string()
      .uri({ relativeOnly: true })
      .required()
      .description('The pathname of the search form.'),
    image: Joi.object().keys({
      width: Joi.number().required().description('The width of the icon'),
      height: Joi.number().required().description('The height of the icon'),
      src: Joi.string()
        .required()
        .description(
          'The pathname for the icon. The site URL will be prefixed to the start'
        ),
    }),
  });
