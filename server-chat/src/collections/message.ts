import { CollectionConfig } from 'payload/types'

const Message: CollectionConfig = {
  slug: 'message',
  access:{
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    {
        name: "sender",
        type: "relationship",
        relationTo: "accounts",
    },
   
    {
      name: "recipients",
      type: 'relationship',
      relationTo: 'accounts',
    },
    {
      name: "message",
      type: "text"
    }
  ],
}

export default Message
