import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'section',
  title: 'Website Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'E.g. Marriage Garden, Banquet Hall, or Luxury Rooms',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Write 2-3 lines about this facility.',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
  ],
})