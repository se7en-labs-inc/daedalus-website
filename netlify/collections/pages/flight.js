export default {
  name: 'flight_page',
  label: 'flight page',
  folder: 'resources/content/flight',
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
      label: 'flight page content',
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
