# gobi-sanity

> gobi

[![NPM](https://img.shields.io/npm/v/gobi-sanity.svg)](https://www.npmjs.com/package/gobi-sanity) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add @gobistories/gobi-sanity
```

## Setup Guide

### Step 1
Install needed dependencie to your sanity project running the following command:
```
$ yarn add @gobistories/gobi-sanity
```

### Step 2
Now lets create a new schema type called gobi, for this create a new file inside the `schemas/` folder with the name `gobi.js` that should look like 
```js
import {gobiSchema} from '@gobistories/gobi-sanity'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'

export default gobiSchema({PatchEvent, set, unset})

```

### Step 3
Now we need to tell Sanity to consider the gobi schema that we just created for this open the file `studio/schemas/schema.js` and import the gobi object that we created and also include the schema in the concat section like shown below:
```js
import gobi from './objects/gobi'

// ...

export default createSchema({
  name: 'blog',
  types: schemaTypes
    .concat([
      // ...
      gobi,
      // ...
    ])
})
```

### Step 4
Now that we have our schema type created and we've already configured how it should look like we need to create the serializer that will basically translate the schema into a component on your website, for that open the file `web/components/serializers.js` and include the following:
```js
import {GobiSerializer} from "@gobistories/gobi-sanity";

// ...

const serializers = {
  types: {
    gobi: ({ node }) => (
      <GobiSerializer node={node} />
    ),
    // ...
};

// ...
```

### Step 5
Now all we need is to add the type to a text editor that you already use, in this case I will give an example on how to add to the `bodyPortableText.js` or `blockContext.js` depending on your version od Sanity, for that open the file `studio/schemas/objects/bodyPortableText.js` and add the following type:
```js
{
  type: 'gobi'
}
```

An example of how the `export default` would look like:
```js
export default {
  name: 'bodyPortableText',
  type: 'array',
  title: 'Post body',
  of: [
    {
      type: 'block',
      title: 'Block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          {
            title: 'Highlight',
            value: 'highlight',
            blockEditor: {
              icon: highlightIcon,
              render: highlightRender
            }
          }
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              }
            ]
          }
        ]
      },
      of: [
        { type: 'authorReference' },
        { type: 'math', icon: mathInlineIcon, title: 'Inline math' }
      ]
    },
    // ADD THIS PIECE HERE
    {
      type: 'gobi'
    }
  ]
}
```


## License

MIT © [gobi](https://github.com/Gobi-Technologies)
