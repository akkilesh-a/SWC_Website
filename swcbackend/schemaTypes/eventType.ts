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
        name:'isCollab',
        title:'Is it a Collaboration',
        type:'boolean',
        initialValue:false
    }),
    defineField({
        name: 'clubname',
        type: 'reference',
        to:[{type:'club'}],
        hidden:({document})=>document?.isCollab?true:false,
    }),
    defineField({
        name: 'clubnames',
        type: 'array',
        of:[
            {
                type:'reference',
                to:[{type:'club'}]
            }
        ],
        hidden:({document})=>!document?.isCollab,
    }),
    defineField({
        name: 'typeOfEvent',
        type: 'array',
        of:[
            {
                type:'string',
            }
        ],
        options:{
            list:[
                {
                    title:"Technical",
                    value:"Technical"
                },
                {
                    title:"Cultural",
                    value:"Cultural"
                },
                {
                    title:"Sports",
                    value:"Sports"
                },
                {
                    title:"Workshop",
                    value:"Workshop"
                },
                {
                    title:"Seminar",
                    value:"Seminar"
                },
                {
                    title:"Conference",
                    value:"Conference"
                },
                {
                    title:"Hackathon",
                    value:"Hackathon"
                },
                {
                    title:"Webinar",
                    value:"Webinar"
                },
                {
                    title:"Fest",
                    value:"Fest"
                },
                {
                    title:"Launch",
                    value:"launch"
                },
                {
                    title:"Competition",
                    value:"Competition"
                },
                {
                    title:"Other",
                    value:"Other"
                }
            ],
            layout:'grid'
        },
        validation:(rule)=>rule
            .required()
            .error('Event type required!')
    }),
    defineField({
        name : 'customEventType',
        type: 'string',
        title: 'Custom Event Type',
        //@ts-expect-error - includes is not defined in the type
        hidden:({document})=>!document?.typeOfEvent?.includes('Other'),
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
        name: 'description',
        type: 'array',
        of:[{
            type:'block'
        }]
    }),
    defineField({
        name: 'customVenueOption',
        title: 'Custom Venue Option',
        type: 'boolean',
        initialValue:false
    }),
    defineField({
        name: 'venue',
        type: 'array',
        of:[
            {
                type:'reference',
                to:[{type:'venue'}]
            }
        ],
        hidden:({document})=>document?.customVenueOption?true:false,
    }),
    defineField({
        name : 'customVenue',
        type: 'string',
        title: 'Custom Venue',
        hidden:({document})=>!document?.customVenueOption,
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
        type: 'number',
        initialValue:0,
    }),
    defineField({
        name:"noOfParticipantsPerTeam",
        type:"string",
        validation:(rule)=>rule
        .required()
        .error('No of Participants required!')
    })
  ],
})