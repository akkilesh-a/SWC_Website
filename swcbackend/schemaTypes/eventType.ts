import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
        name: 'name',
        type: 'string',
        validation:(rule)=>rule
            .required()
            .error('Event name required!')
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
        name: 'clubname',
        type: 'reference',
        to:[{type:'club'}]
    }),
    defineField({
        name: 'description',
        type: 'array', 
        of: [{type: 'block'}]
    }),
    defineField({
        name: 'poster',
        type: 'image',
        validation:(rule)=>rule
        .required()
        .error('Image Required')
    }),
  ],
})