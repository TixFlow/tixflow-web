import React from 'react';
import Header from '../../components/Header/header';
import SlideIndex from '../../components/SlideIndex/SlideIndex';
import Footer from '../../components/Footer/footer';
import HomeContent from './Content';

const HomePage: React.FC = () => {
  
  return <div>
    <Header/>
    <SlideIndex/>
    <HomeContent/>
    <Footer/>
  </div>;
};

export default HomePage;
