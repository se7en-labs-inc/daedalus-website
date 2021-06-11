export default {
  name: 'download_page',
  label: 'download page',
  folder: 'resources/content/download',
  create: false,
  delete: false,
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
    },
    {
      name: 'content',
      label: 'download page content',
      widget: 'object',
      fields: [
        {
          name: 'default_content',
          label: 'Default content',
          widget: 'string',
        },
      ],
    },
  ],
}
