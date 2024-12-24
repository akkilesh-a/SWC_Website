import {defineField, defineType} from 'sanity'

export const clubType = defineType({
  name: 'club',
  title: 'Clubs',
  type: 'document',
  fields: [
    defineField({
        name: 'name',
        type: 'string',
        validation:(rule)=>rule
            .required()
            .error('Club name required!')
    }),
    defineField({
        name: 'description',
        type: 'text',
    }),
    defineField({
        name: 'category',
        type: 'string',
        validation:(rule)=>rule
            .required()
            .error('Club category required!')
    }),
    defineField({
        name: 'logo',
        type: 'image',
        validation:(rule)=>rule
        .required()
        .error('Club logo required!')
    }),
  ],
})