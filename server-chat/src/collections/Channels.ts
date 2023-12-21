import { CollectionConfig } from 'payload/types'

const Channels: CollectionConfig = {
  slug: 'channels',
  access:{
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
        name : "channel_name",
        type : "text",
        label : "Channel Name",
        required : true
    },
    {
      name: "channel_member",
      type: 'relationship',
      relationTo: 'accounts',
      hasMany : true
    }
  ],
}

export default Channels
