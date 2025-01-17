import {defineField, defineType} from 'sanity'

export const officeBearerType = defineType({
  name: 'officeBearer',
  title: 'Office Bearers',
  type: 'document',
  fields: [
    defineField({
        name: 'name',
        type: 'string',
        validation:(rule)=>rule
            .required()
            .error('Field Required')
    }),
    defineField({
        name: 'designation',
        type: 'string',
        validation:(rule)=>rule
        .required()
        .max(20)
        .error('String of max length 20 is required')
    }),
    defineField({
        name: 'description',
        type: 'text',
    }),
    defineField({
        name: 'image',
        type: 'image',
        validation:(rule)=>rule
        .required()
        .error('Image Required')
    }),
    defineField({
        name: 'informalImage',
        type: 'image',
        validation:(rule)=>rule
        .required()
        .error('Informal Image Required')
    })
  ],
})