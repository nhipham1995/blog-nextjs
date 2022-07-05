import React, {useState, useEffect} from 'react';
import {submitComment} from '../services';

const CommentForm = ({slug}) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false });


  useEffect(()=>{
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };
  const handleCommentSubmission = () => {
      setError(false);
      const { name, email, comment, storeData } = formData;
      if (!name || !email || !comment) {
        setError(true);
        return;
      }
      console.log(name, email, comment, storeData);
      const commentObj = {
        name,
        email,
        comment,
        slug,
      };
  
      if (storeData) {
        window.localStorage.setItem('name', name);
        window.localStorage.setItem('email', email);
      } else {
        window.localStorage.removeItem('name');
        window.localStorage.removeItem('email');
      }
  
      submitComment(commentObj)
        .then((res) => {
          if (res.createComment) {
            if (!storeData) {
              formData.name = '';
              formData.email = '';
            }
            formData.comment = '';
            setFormData((prevState) => ({
              ...prevState,
              ...formData,
            }));
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
            }, 3000);
          }
        });
    };
  



  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 '>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Leave A Reply
      </h3>
      <div className='grid grod-cols-1 gap-4 mb-4 '>
        <textarea 
          value={formData.comment ? formData.comment : '' }
          className="p-4 outline-none w-full rounded-lg focus:ring-grap-200 bg-gray-100 text-gray-700 "
          placeholder='Comment'
          name="comment"
          onChange={onInputChange}
        />            
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>
        <input
          value={formData.name ? formData.name : '' }
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-grap-200 bg-gray-100 text-gray-700 "
          placeholder='Name'
          name="name"
          onChange={onInputChange}
        />
        <input
          value={formData.email ? formData.email : '' }
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-grap-200 bg-gray-100 text-gray-700 "
          placeholder='Email'
          name="email"
          onChange={onInputChange}
        />
        <div className='grid grid-cols-1 gap-4 mb-4 '>
          <div>
            <input  type="checkbox" id='storeData' name='storeData' value='true' onChange={onInputChange} checked={formData.storeData} />
            <label 
              htmlFor='storeData' 
              className='text-gray-500 cursor-pointer ml-2'>
                  Save my email and name for the next time I comment.
            </label>
          </div>
        </div>

        {error && <p className='text-xs text-red-500'>All fields are required!</p>}
        <div className='mt-8'>
          <button 
            type='submit'
            className='transition duration-500 float-right px-3 py-2 ease hover:bg-indingo-90 inline-block bg-pink-600 rounded-full text-white cursor-pointer'
            onClick={handleCommentSubmission}>
              Add Comment
          </button>
          {showSuccess && <span className='text-xl float-right font-semibold text-green-500 mt-5 '>Comment submitted for review</span>}
        </div>
      </div>
    </div>
  )
}

export default CommentForm