import React from 'react'
import { Gobi } from '.'
import GobiPreview from './GobiPreview'

const GobiComponent = (props: any) => <Gobi {...props} />

const gobiSchema = (values: any) => ({
  name: 'gobi',
  title: 'Gobi Stories',
  type: 'document',
  fields: [
    {
      name: 'gobiValues',
      type: 'object',
      inputComponent: (props: any) => <GobiComponent {...values} {...props} />,
      fields: [
        {
          name: 'story',
          type: 'string'
        }
      ]
    }
  ],
  preview: {
    select: {
      gobiValues: 'gobiValues'
    },
    component: (props: any) => <GobiPreview {...values} {...props} />
  }
})

export default gobiSchema
