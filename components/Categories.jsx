import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    getCategories()
    .then(newcategories => setCategories(newcategories));
  }, [])

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
    <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
      Categories
    </h3>
    {categories && categories.map(category=>(
      <div key={category.name} className='flex items-center w-full'>
          <Link href={`/category/${category.slug}`} key={category.name}>
            {category.name}
          </Link>
      </div>))}
    </div>
  )
}

export default Categories