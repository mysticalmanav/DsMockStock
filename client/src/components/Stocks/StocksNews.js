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
        <div className='pt-2 mt-5'>
    <div className="stock-market-news container borderd rounded mt-2 mx-auto">
      <h2 className='text-center p-2'>News</h2> 
      <p className='color-nav font-heavy-l text-center'>Its news till its new.</p>
    <div className='px-2'><Link to='/stocks' ><button
            className="btn btn-md btn-outline-primary my-3"
             
          >Trade
          </button></Link></div>
      <ul className='p-0'>
        {news.length>0&&news.map((item) => (
          
          <li key={item._id}  className='mb-3'>
             <Card className='bg-light border'>
             <Card.Header className='text-heavy bg-light'><h5 >{item.topic}</h5></Card.Header>
      <Card.Body>
         
        <Card.Text>
      <p>{ item.detail} </p> 
        </Card.Text>
        <p className="news-date font-heavy font-s color-nav mb-0 mt-3"><Moment format='MMMM Do YYYY, h:mm:ss a'>{item.date}</Moment></p> 
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
