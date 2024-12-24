import {defineField, defineType} from 'sanity'

export const newsletterType = defineType({
  name: 'newsletter',
  title: 'News Letters',
  type: 'document',
  fields: [
    defineField({
        name: 'link',
        type: 'url',
        validation:(rule)=>rule
            .required()
            .error('URL required!')
    }),
    defineField({
        name:'date',
        type:'date',
        validation:(rule)=>rule
            .required()
            .error('Date required!')
    })
  ],
})