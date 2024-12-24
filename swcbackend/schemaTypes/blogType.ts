import {defineField, defineType} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blogs',
  type: 'document',
  fields: [
    defineField({
        name: 'title',
        type: 'string',
        validation:(rule)=>rule
            .required()
            .error('Title required!')
    }),
    defineField({
        name: 'description',
        type: 'array',
        of:[{type:'block'}]
    }),
    defineField({
        name: 'date',
        type: 'datetime',
        options: {
            dateFormat: 'DD-MM-YYYY',
            timeFormat: 'HH:mm',
        }
    }),
    defineField({
        name: 'image',
        type: 'image',
    }),
  ],
})