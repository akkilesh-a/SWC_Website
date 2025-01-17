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
        name: 'typeOfEvent',
        type: 'string',
        validation:(rule)=>rule
            .required()
            .error('Event type required!')
            .max(20)
            .error('Event type should be less than 20 characters')
    }),
    defineField({
        name: 'startDate',
        type: 'datetime',
        title: 'Start Date',
        options: {
            dateFormat: 'DD-MM-YYYY',
            timeFormat: 'HH:mm',
        },
        validation:(rule)=>rule
            .required()
            .error('Event Start Date required!')
    }),
    defineField({
        name: 'endDate',
        type: 'datetime',
        title: 'End Date',
        options: {
            dateFormat: 'DD-MM-YYYY',
            timeFormat: 'HH:mm',
        },
        validation: rule => rule
            .required()
            .min(rule.valueOfField('startDate'))
            .error('End Date must be after Start Date')
    }),
    defineField({
        name: 'clubname',
        type: 'array',
        of:[
            {
                type:'reference',
                to:[{type:'club'}]
            }
        ]
    }),
    defineField({
        name: 'description',
        type: 'array', 
        of: [{type: 'block'}]
    }),
    defineField({
        name: 'venue',
        type: 'string',
        validation:(rule)=>rule
            .required()
            .error('Event Venue required!')
    }),
    defineField({
        name: 'poster',
        type: 'image',
        validation:(rule)=>rule
        .required()
        .error('Image Required')
    }),
    defineField({
        name: 'entryFee',
        title:'Entry Fee',
        type: 'number'
    })
  ],
})