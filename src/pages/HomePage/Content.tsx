import React, { useEffect, useState } from 'react';
import { Carousel, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import api from '../../config/axios';
import './Content.scss';
import Loading from '../../components/Loading/Loading';

const HomeContent: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
   const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    api.get(`/blogs?page=${currentPage}`)
      .then(response => {
        const { data, totalPage } = response.data;
        setBlogs(data);
        setTotalPages(totalPage);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  const groupBlogsByCategory = (blogs: any[]) => {
    return blogs.reduce((acc: any, blog: any) => {
      const { category } = blog;
      if (!acc[category]) acc[category] = [];
      acc[category].push(blog);
      return acc;
    }, {});
  };

  const groupedBlogs = groupBlogsByCategory(blogs);

  const renderCategoryBlogs = (category: string) => {
    const categoryBlogs = groupedBlogs[category] || [];
    return (
      <div key={category} className="category-carousel">
        <Divider orientation="center" className="category-divider">
          <h2 className="category-title text-2xl font-semibold mb-4">{category.toUpperCase()}</h2>
        </Divider>
        <Carousel
          autoplay
          dots={false}
          arrows={true}
          infinite
          slidesToShow={4}
          slidesToScroll={4}
        >
          {categoryBlogs.map((blog: any) => (
            <div 
              key={blog.id} 
              className="blog-card"
              onClick={() => navigate(`/blogs/${blog.id}`)}
            >
              <img 
                src={blog.imageUrl} 
                alt={blog.title} 
                className="blog-card-image w-full h-48 object-cover rounded-lg" 
              />
              <h3 className="blog-card-title mt-2 text-center text-xs">{blog.title}</h3>
            </div>
          ))}
        </Carousel>
      </div>
    );
  };

  const handlePageChange = (page: number) => {
    setLoading(true); 
    setCurrentPage(page);
  };

  return (
    <div className="blog-carousel-container">
      <div className="flex justify-center space-x-20 py-4 px-4">
        <button className="action-btn" onClick={() => navigate('/ticket-buy')}>MUA LẠI VÉ</button>
        <button className="action-btn" onClick={() => navigate('/ticket-sale')}>BÁN LẠI VÉ</button>
      </div>

     {loading ? (
        <Loading /> 
      ) : (
        Object.keys(groupedBlogs).map(category => renderCategoryBlogs(category))
      )}

      <div className="pagination-buttons text-center mt-6">
        {currentPage > 1 && (
          <Button onClick={() => setCurrentPage(currentPage - 1)} className="pagination-btn">
            &lt; Prev
          </Button>
        )}
        {currentPage < totalPages && (
          <Button onClick={() => setCurrentPage(currentPage + 1)} className="pagination-btn">
            Next &gt;
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeContent;
