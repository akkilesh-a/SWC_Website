import {defineField, defineType} from 'sanity'

export const venueType = defineType({
  name: 'venue',
  title: 'Venues',
  type: 'document',
  fields: [
    defineField({
        name : 'venueImage',
        type: 'image',
        validation:(rule)=>rule
            .required()
            .error('Field Required')
    }),
    defineField({
        name: 'venueName',
        type: 'string',
        validation:(rule)=>rule
            .required()
            .error('Field Required')
    }),
    defineField({
        name: 'academicBlock',
        title: 'Academic Block/Location inside Campus',
        type: 'string',
        validation:(rule)=>rule
            .required()
            .error('Field Required')
    }),
    defineField({
        name: 'locationLink',
        type: 'url',
        validation:(rule)=>rule
        .required()
        .error('Field Required')
    }),
    defineField({
        name: 'capacity',
        type: 'number',
    }),
  ],
})