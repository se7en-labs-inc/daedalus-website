export default {
  name: 'team_page',
  label: 'team page',
  folder: 'resources/content/team',
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
      label: 'team page content',
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
