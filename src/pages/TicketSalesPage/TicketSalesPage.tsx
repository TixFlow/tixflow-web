import React, { useState, useEffect } from 'react';
import { Card, Divider, Pagination, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import Footer from '../../components/Footer/footer';
import Header from '../../components/Header/header';
import './TicketSales.scss';

interface Ticket {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}

const TicketSalesPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalTickets, setTotalTickets] = useState<number>(0);
  const navigate = useNavigate();

  const fetchTickets = async (page: number = 1): Promise<void> => {
    try {
      setLoading(true);
      console.log('Fetching tickets for page:', page); 
      const response = await api.get(`/tickets?page=${page}&size=12`);
      const data = response.data || {};
      setTickets(data.data || []);
      setTotalTickets(data.total || 0); 
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching tickets:', error);
    }
  };

  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number): void => {
    console.log('Page changed to:', page);
    setCurrentPage(page);
  };

  const handleTicketClick = (ticketId: string): void => {
    navigate(`/ticket-detail/${ticketId}`);
  };

  return (
    <div>
      <Header />
      <div className="ticket-sales-page mt-12">
        <Divider orientation="center" className="category-divider">
          <h2>Tickets for Sale</h2>
        </Divider>
        {loading ? (
          <div className="loading-spinner">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="ticket-grid">
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <Card
                    key={ticket.id} 
                    hoverable
                    className="ticket-card"
                    cover={<img alt={ticket.title} src={ticket.imageUrl} />}
                    onClick={() => handleTicketClick(ticket.id)}
                  >
                    <Card.Meta
                      title={ticket.title}
                      description={`${ticket.price.toLocaleString()} VNĐ`}
                    />
                  </Card>
                ))
              ) : (
                <p>No tickets available.</p>
              )}
            </div>
            {totalTickets > 0 && (
              <div className="pagination-container">
                <Pagination
                  current={currentPage}
                  total={totalTickets}
                  pageSize={12}
                  onChange={handlePageChange}
                  showSizeChanger={false} 
                />
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TicketSalesPage;
