import {defineField, defineType} from 'sanity'

export const announcementType = defineType({
  name: 'announcement',
  title: 'Announcements',
  type: 'document',
  fields: [
    defineField({
        name: 'title',
        type: 'string',
        validation:(rule)=>rule
            .required()
            .error('title Required')
    }),
    defineField({
        name: 'description',
        type: 'text',
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
        name: 'expiry',
        type: 'datetime',
        options: {
            dateFormat: 'DD-MM-YYYY',
            timeFormat: 'HH:mm',
        }
    }),
    defineField({
        name: 'category',
        type: 'image',
    }),
  ],
})