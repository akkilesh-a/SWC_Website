import {defineField, defineType} from 'sanity'

export const newsletterType = defineType({
  name: 'newsletter',
  title: 'News Letters',
  type: 'document',
  fields: [
    defineField({
        name: 'link',
        type: 'url',
        description:'Use embed link to the newsletter!',
        validation:(rule)=>rule
            .required()
            .error('URL required!')
    }),
    defineField({
        name:'date',
        type:'date',
        description:'Date of the newsletter, Not current date!',
        validation:(rule)=>rule
            .required()
            .error('Date required!')
    })
  ],
})