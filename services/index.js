import {request, gql} from 'graphql-request';


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const queries = gql `
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                id
                name
                photo {
                  url
                }
                publishedAt
              }
              featuredImage {
                url
              }
              excerpt
              title
              slug
              categories {
                name
                slug
              }
            }
          }
        }
      }
        `      
    const results = await request(graphqlAPI,queries);
    return results.postsConnection.edges;    
}

export const getRecentPosts = async () => {
  const query = gql `
    query GetPostDetails(){
      posts(
        orderBy: publishedAt_ASC
        last: 3
      ) {
        title
        featuredImage{
          url
        }
        publishedAt
        slug
      }
    }
  `
    const result = await request(graphqlAPI, query);
    return result.posts;
}
export const getSimilarPosts = async (categories, slug) =>{
  const query = gql`
    query getPostDetails($slug: String!, $categories: [String!]){
      posts (
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ){
        title
        featuredImage{
          url
        }
        publishedAt
        slug
      }
    }  
  `
  const result = await request(graphqlAPI, query, {slug, categories});
  return result.posts;
}

export const getCategories = async () => {
  const query = gql `
    query GetCategories{
      categories {
        name
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query);
  return result.categories;
}

export const getPostDetails = async (slug) => {
  const queries = gql `
  query getPostDetails($slug: String!) {
    post(where: {slug: $slug}){
      author {
        bio
        id
        name
        photo {
          url
        }
        publishedAt
      }
      featuredImage {
        url
      }
      excerpt
      title
      slug
      categories {
        name
        slug
      }
      content {
        raw
      }
    }
  }
      `      
  const results = await request(graphqlAPI,queries, {slug});
  return results.post;    
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  return result.json();
}
export const getComments = async (slug) => {
  const query = gql `
    query GetComments($slug: String!){
      comments(where : {post: {slug: $slug}}){
        name
        publishedAt
        comment
      }
    }
  `
  const result = await request(graphqlAPI, query, {slug});
  return result.comments;
}

export const getCategoryPosts = async (category) =>{
  const query = gql`
    query getPost($category: String!){
      posts (
        where: {categories_some: {slug: $category}}
      ){
        title
        featuredImage{
          url
        }
        publishedAt
        slug
        author {
          bio
          id
          name
          photo {
            url
          }
          publishedAt
        }
        categories {
          name
          slug
        }
      }
    }  
  `
  const result = await request(graphqlAPI, query, {category});
  return result.posts;
}
export const nameCategory= async(slug)=>{
  const query = gql`
  query nameCategory($slug: String!){
    category (
      where: {slug: $slug}
    ){
      name,
      slug
    }
  }`
  const result = await request(graphqlAPI, query, {slug});
  return result.category;
}
export const getAllCategories= async ()=> {
  const query = gql`
  query allCategories{
    categoriesConnection {
      edges {
        node {
          name,
          slug
        }
      }
    }
  }`
  const result = await request(graphqlAPI, query);
  return result.categoriesConnection.edges;

}
