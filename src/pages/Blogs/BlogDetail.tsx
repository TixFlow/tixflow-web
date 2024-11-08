import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import api from '../../config/axios';
import './BlogDetail.scss'; 
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [blog, setBlog] = useState<any>(null); 

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then(response => {
        setBlog(response.data);
      })
      .catch(error => {
        console.error('Error fetching blog details:', error);
      });
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
        <Header/>
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <img src={blog.imageUrl} alt={blog.title} className="blog-detail-image" />
      <div className="blog-content">{blog.content}</div>
      <p><strong>Category:</strong> {blog.category}</p>
    </div>
    <Footer/>
    </div>
  );
};

export default BlogDetail;
