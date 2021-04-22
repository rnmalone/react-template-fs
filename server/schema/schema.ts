import {gql} from 'apollo-server'

const typeDefs = gql`
    type Todo {
        title: String
        description: String
        imageSrc: String
    }
    
    type Query {
        Todos: [Todo]
    }
`

export default typeDefs;
