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
    }),
    defineField({
        name:'date',
        type:'date',
        description:'Date of the newsletter, Not current date!',
        validation:(rule)=>rule
            .required()
            .error('Date required!')
    }),
    defineField({
      name:"pdfFile",
      title:"PDF File",
      type:"file",
      description:"PDF file of the newsletter"
    }),
    defineField({
      name:"coverPhoto",
      type:"image",
      description:"First page of the newsletter"
    })
  ],
})