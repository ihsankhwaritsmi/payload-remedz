import { CollectionConfig } from 'payload/types'

const Accounts: CollectionConfig = {
  slug: 'accounts',
  auth: true,
  access:{
    create: () => true,
    read: () => true
    // update: () => true,
    // delete: () => true
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
        name : "username",
        type : "text",
        label : "Username",
        required : true
    },
    {
        name: "birthdate",
        type: "date",
        label: "Birthdate",
        required: true
    }
  ],
}

export default Accounts
