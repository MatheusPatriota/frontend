import graphql from 'babel-plugin-relay/macro';
// import { graphql } from 'react-relay';

const query = graphql`
  query AppQuery {
    viewer {
      id,
      me {
        ...Navbar_me
      }
    }
  }
`;
export default query
