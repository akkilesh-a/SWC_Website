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
    defineField({
      name: 'faculty1',
      type: 'string',
      title:'Faculty 1',
      placeholder:"Faculty Co-Ordinator 1"
    }),
    defineField({
      name: 'faculty2',
      type: 'string',
      title:'Faculty 2',
      initialValue:"null",
      placeholder:"Faculty Co-Ordinator 2"
    }),
  ],
})