import React from 'react';
import { getCategories, getCategoryPosts, nameCategory, getAllCategories } from '../../services';
import {Categories, PostWidget, PostCard} from '../../components';


const PostsCategorie = ({posts, category, categories}) => {
  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            <div className='col-span-1 lg:col-span-8'>
                <h2 className='text-center text-pink-900 text-4xl mb-20'>
                    Category: {category.name}
                </h2>
                {!posts[0] && <h5>There is no post in this category.</h5>}
                {posts.map((post, index) => 
                    <PostCard post={post} key={index}/>
                )}
            </div>
            <div className='col-span-1 lg:col-span-4'>
                <div className='relative lg:sticky top-8 '>      
                    <PostWidget 
                        slug={category.slug} 
                        categories={categories.map(category=>category.slug)}
                    /> 
                    <Categories/>
                </div>
            </div>
        </div>
    </div>
  )
}

export async function getStaticProps({params}){
    const posts = await getCategoryPosts(params.slug);
    const category = await nameCategory(params.slug);
    const categories = await getAllCategories();
    return {
        props: {
            posts,
            category,
            categories: categories.map((category)=> category.node)
        }
    }
}

export async function getStaticPaths(){
    const categories = await getCategories();
    const paths = categories.map(category=> ({params: {slug: category.slug}}));
    return {
        paths,
        fallback: false
    }
}
export default PostsCategorie