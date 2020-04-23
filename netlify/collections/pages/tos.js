export default {
  name: 'tos_page',
  label: 'tos page',
  folder: 'resources/content/tos',
  create: false,
  delete: false,
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string'
    },
    {
      name: 'content',
      label: 'tos page content',
      widget: 'object',
      fields: [
        {
          name: 'default_content',
          label: 'Default content',
          widget: 'string'
        }
      ]
    }
  ]
}
