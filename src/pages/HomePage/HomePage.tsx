import React from 'react';
import Header from '../../components/Header/header';
import SlideIndex from '../../components/SlideIndex/SlideIndex';
import Footer from '../../components/Footer/footer';

const HomePage: React.FC = () => {
  const sections = [
    {
      title: 'SỰ KIỆN ĐẶC BIỆT',
      events: [
        { title: 'WONDER Music Festival', date: '22.07.2023', button: 'Xem thêm', image: '/path/to/image1.jpg' },
        { title: 'SPRING Festival', date: '08.03.2023', button: 'Xem thêm', image: '/path/to/image2.jpg' },
      ],
    },
    {
      title: 'SỰ KIỆN NỔI BẬT',
      events: [
        { title: 'Make it Possible', image: '/path/to/image3.jpg' },
        { title: 'Choose Your Destiny', image: '/path/to/image4.jpg' },
    
      ],
    },
    {
      title: 'VĂN HÓA NGHỆ THUẬT',
      events: [
        { title: 'Giao Lưu Văn Hóa Việt - Hàn', image: '/path/to/image5.jpg' },
        { title: 'Sắc Rực Rỡ Việt Nam', image: '/path/to/image6.jpg' },
       
      ],
    },
    {
      title: 'WORKSHOP',
      events: [
        { title: 'Workshop Kỹ Năng Thuyết Trình', image: '/path/to/image7.jpg' },
        { title: 'Workshop Học Tiếng Anh Hiệu Quả', image: '/path/to/image8.jpg' },
    
      ],
    },
    {
      title: 'SỰ KIỆN KHÁC',
      events: [
        { title: 'Sound Freedom', image: '/path/to/image9.jpg' },
        { title: 'Summer Fest', image: '/path/to/image10.jpg' },
    
      ],
    },
  ];
  return <div>
    <Header/>
    <SlideIndex/>
   {/* <div className="homepage bg-white">
    
      <div className="flex justify-center space-x-4 py-4">
        <button className="border border-black px-4 py-2 rounded-full">MUA LẠI VÉ</button>
        <button className="border border-black px-4 py-2 rounded-full">BÁN LẠI VÉ</button>
      </div>
      
  
      {sections.map((section, index) => (
        <div key={index} className="my-8">
          <h2 className="text-center text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="border-b-2 border-gray-200 mb-4"></div>
          
     
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {section.events.map((event, eventIndex) => (
              <div key={eventIndex} className="event-card relative">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-lg" />
                <div className="absolute bottom-0 bg-opacity-60 bg-black text-white p-2 rounded-b-lg w-full text-center">
                  <p className="font-semibold">{event.title}</p>
                  {event.date && <p className="text-sm">{event.date}</p>}
                  {event.button && (
                    <button className="bg-white text-black px-3 py-1 rounded-full mt-2 text-sm font-semibold">
                      {event.button}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

    
      <div className="text-center py-8">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full">XEM THÊM CÁC SỰ KIỆN KHÁC</button>
      </div>
    </div> */}
  );

    <Footer/>
  </div>;
};

export default HomePage;
