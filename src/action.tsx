import api from './api';
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import { NewsAction, NewsState } from './reducer/newsReducer';

const API_URL = "http://localhost:8080/";

const loadFromServer = ( page: Number, dispatch: ThunkDispatch< NewsState[], {}, NewsAction>  ): void => {
  axios.get( API_URL + page ).then(response => {
    dispatch( {
      type: "data",
      from: response.data.first,
      payload: response.data.data.map( (obj: NewsState) => ({
        _id: obj._id,
        duplictae: obj.duplictae,
        favCount: obj.favCount,
        image: obj.image,
        pricing: obj.pricing,
        publishedAt: obj.publishedAt,
        publishedAt_timestamp: obj.publishedAt_timestamp,
        reviewCount: obj.reviewCount,
        reviewScore: obj.reviewScore,
        socialLinks: obj.socialLinks,
        sponser: obj.sponser,
        startingPrice: obj.startingPrice,
        status: obj.status,
        tagsIndex: obj.tagsIndex,
        toolCategories: obj.toolCategories,
        toolName: obj.toolName,
        toolShortDescription: obj.toolShortDescription,
        verified: obj.verified,
        verifiedReason: obj.verifiedReason,
        websiteUrl: obj.websiteUrl,
      }) ),
    });
  }).catch(error => {
    console.log(error);
    dispatch( {
      type:"error",
      from: 0,
      payload: [],
    } );
  })
}

export default loadFromServer;