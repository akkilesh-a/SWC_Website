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
      name: 'abbreviation',
      type: 'string',
      validation:(rule)=>rule
        .max(15)
        .error('Abbreviation should be less than 10 characters')
  }),
    defineField({
        name: 'description',
        type: 'text',
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
      name: 'faculty1url',
      type: 'url',
      title:'Faculty 1 URL',
      placeholder:"Faculty Co-Ordinator 1 URL"
    }),
    defineField({
      name: 'faculty2',
      type: 'string',
      title:'Faculty 2',
      initialValue:"null",
      placeholder:"Faculty Co-Ordinator 2"
    }),
    defineField({
      name: 'faculty2url',
      type: 'url',
      title:'Faculty 2 URL',
      placeholder:"Faculty Co-Ordinator 2 URL"
    }),
    defineField({
      name:"clubType",
      type:"string",
      options:{
        list:["Technical Club","Recreational Club","Special Team","Chapter","Literary Club","Other"],
        layout:"dropdown",
      },
      validation:(rule)=>rule
      .required()
      .error('Club type required!')
    })
  ],
})