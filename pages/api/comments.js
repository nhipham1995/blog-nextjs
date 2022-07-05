import {GraphQLClient, gql} from 'graphql-request';
const graphqlAPI = 'https://api-eu-central-1.graphcms.com/v2/cl4mpf4mq04xk01zbhyskenzn/master';

export default async function comments(req, res){
  const {name, email, slug, comment} = req.body;
  // const request = process.env.GRAPHCMS_TOKEN;
  const graphQLClient = new GraphQLClient(graphqlAPI,{ 
    headers: {
      authorrization: `Bearer ${request}` 

    }
  })
  
  const query = gql`
  mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
    createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
  }
  `;

  try{
    const result = await graphQLClient.request(query, {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      slug: req.body.slug
    });
    return res.status(200).send(result);
  } catch(err){
    return res.status(500).send(err);
  }
  
}