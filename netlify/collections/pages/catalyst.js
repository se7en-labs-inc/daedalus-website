export default {
  name: 'catalyst_page',
  label: 'catalyst page',
  folder: 'resources/content/catalyst',
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
      label: 'catalyst page content',
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
