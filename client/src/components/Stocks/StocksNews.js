import React, { useEffect } from 'react';
import { getNews } from '../../actions/news';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Moment from "react-moment";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const StockMarketNews = ({ news:{news,loading},getNews }) => {
    useEffect(()=>{
        getNews();
    },[]);
    return loading || news === null ? (
       <Spinner/>
      ) : (
        <div className='news-bg pt-2'>
    <div className="stock-market-news container borderd Data_frosty__3tA4I rounded mt-2 mx-auto">
      <h3 className='text-center p-2'>Stock Market News</h3> 
    <div className='px-2'><Link to='/stocks' ><button
            className="btn btn-md btn-outline-dark my-3"
             
          >Buy and Sell Stocks
          </button></Link></div>
      <ul className='p-0'>
        {news.length>0&&news.map((item) => (
          
          <li key={item._id}  className='my-2   '>
             <Card  className=' border-dark border'>
             <Card.Header><h4 className='text-heavy'>{item.topic}</h4></Card.Header>
      <Card.Body>
         
        <Card.Text>
      <p className='text-heavy'>{ item.detail} </p> 
        </Card.Text>
        <p className="news-date text-dark"><Moment format='MMMM Do YYYY, h:mm:ss a'>{item.date}</Moment></p> 
      </Card.Body>  
    </Card>  
             
           
          </li> 
        ))}
      </ul>
    </div>
    </div>
  );
};
StockMarketNews.propTypes = {
news:PropTypes.object.isRequired,
getNews:PropTypes.func.isRequired


}
const mapStateToProps = state =>({
  news:state.news
})

export default connect(mapStateToProps,{getNews}) (StockMarketNews);
