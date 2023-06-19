import CustomLink from '@/components/CustomLink';
import { VscStarFull, VscStarHalf, VscStarEmpty } from 'react-icons/vsc';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { NewsState, NewsAction } from '@/reducer/newsReducer';
import { ThunkDispatch } from 'redux-thunk';

import { Button } from '@material-ui/core';

const Star = ( props ) => {
  const { mark } = props;
  return (
    <>
      { mark < 0 ? <VscStarEmpty /> : (mark >= 1 ? <VscStarFull /> : <VscStarHalf />) }
    </>
  )
}

const PostList = () => {
  const posts:NewsState[] = useSelector<NewsState[], NewsState[]>(state => state);  

  return (
    <>
      <div className="divide-y divide-blue-500 transition-colors dark:divide-gray-200 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        {!posts.length && 'No posts found.'}
        {posts.map((post, idx) => {
          const { toolName, toolShortDescription, websiteUrl, image, pricing, verified, startingPrice, favCount, toolCategories, reviewCount, reviewScore} = post;
          const review = reviewScore / reviewCount;
          return (
            <li key={idx} className="group transition-colors bg-gray-100 border border-gray-200 rounded-lg shadow-2xl list-none">
              <CustomLink href={websiteUrl}>
                <div
                  className="relative aspect-h-1 h-100 min-h-100 max-h-100 w-100 aspect-w-1 overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                  style={{
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                  }}
                >
                  <img
                    src={image}
                    className="h-full w-full object-cover object-center group-hover:opacity-75" style={{ height: '160px' }}
                  />
                  { startingPrice && (
                    <span
                      className="absolute top-3 right-0 p-2 text-center shadow-lg dark:border-gray-800 text-yellow shadow"
                      style={{
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                        backgroundColor: "rgba(253, 224, 71, 0.8)",
                      }}
                    >
                      ${startingPrice}
                    </span>
                  ) }
                </div>

                <div className=" px-5 py-3 h-100 ">
                  <div className='flex' style={{justifyContent: "space-between"}}>

                    <span className="relative text-gray-500 transition-colors dark:text-gray-400 mt-1 text-lg font-medium text-gray-900">
                      {toolName}
                      { verified==true && (
                      <svg
                        className="inline-block ml-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                      >
                        <path d="M17.03 9.78a.75.75 0 00-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6-6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.136 1.2a3.61 3.61 0 00-4.272 0L8.489 2.21a2.11 2.11 0 01-.929.384l-1.686.259a3.61 3.61 0 00-3.021 3.02L2.594 7.56a2.11 2.11 0 01-.384.929L1.2 9.864a3.61 3.61 0 000 4.272l1.01 1.375c.2.274.333.593.384.929l.259 1.686a3.61 3.61 0 003.02 3.021l1.687.259c.336.051.655.183.929.384l1.375 1.01a3.61 3.61 0 004.272 0l1.375-1.01a2.11 2.11 0 01.929-.384l1.686-.259a3.61 3.61 0 003.021-3.02l.259-1.687a2.11 2.11 0 01.384-.929l1.01-1.375a3.61 3.61 0 000-4.272l-1.01-1.375a2.11 2.11 0 01-.384-.929l-.259-1.686a3.61 3.61 0 00-3.02-3.021l-1.687-.259a2.11 2.11 0 01-.929-.384L14.136 1.2zm-3.384 1.209a2.11 2.11 0 012.496 0l1.376 1.01a3.61 3.61 0 001.589.658l1.686.258a2.11 2.11 0 011.765 1.766l.26 1.686a3.61 3.61 0 00.657 1.59l1.01 1.375a2.11 2.11 0 010 2.496l-1.01 1.376a3.61 3.61 0 00-.658 1.589l-.258 1.686a2.11 2.11 0 01-1.766 1.765l-1.686.26a3.61 3.61 0 00-1.59.657l-1.375 1.01a2.11 2.11 0 01-2.496 0l-1.376-1.01a3.61 3.61 0 00-1.589-.658l-1.686-.258a2.11 2.11 0 01-1.766-1.766l-.258-1.686a3.61 3.61 0 00-.658-1.59l-1.01-1.375a2.11 2.11 0 010-2.496l1.01-1.376a3.61 3.61 0 00.658-1.589l.258-1.686a2.11 2.11 0 011.766-1.766l1.686-.258a3.61 3.61 0 001.59-.658l1.375-1.01z"
                        />
                      </svg> ) }
                    </span>
                    
                    <span className="block text-xl mr-4 mb-2 text-red-500 dark:text-red">  
                      <svg
                        className="inline-block"
                        viewBox="20 100 1124 1024"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                      >
                        <path d="M834.1 469.2A347.49 347.49 0 00751.2 354l-29.1-26.7a8.09 8.09 0 00-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9-11 29.5-26.8 56.9-47 81.5a295.64 295.64 0 01-47.5 46.1 352.6 352.6 0 00-100.3 121.5A347.75 347.75 0 00160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0075.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 00760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0027.7-136c0-48.8-10-96.2-29.9-140.9z" />
                      </svg>
                      {favCount}
                    </span>

                  </div>
                  
                  <span style={{color: "#faaf00", display: "flex"}}>
                    <Star mark={review} />
                    <Star mark={review - 1} />
                    <Star mark={review - 2} />
                    <Star mark={review - 3} />
                    <Star mark={review - 4} />
                     {/* ({reviewCount})  */}
                  </span>

                  <h1 className="text-gray-500 w-64 transition-colors dark:text-gray-400 my-4 text-medium line-clamp-2 text-gray-700" style={{ height: '50px' }}>{toolShortDescription}</h1>

                </div>

                <div className="px-5 py-3 h-100">
                  <button className="block border border-gray-400 rounded broder-radius-4 px-4 py-2 m-1 cursor-not-allowed text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                    <svg
                      className="inline-block mr-1"                
                      viewBox="20 100 1124 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M832 464H332V240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v68c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-68c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM540 701v53c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-53a48.01 48.01 0 1156 0z" />
                    </svg>
                    {pricing}
                  </button>
                  <div>
                    {toolCategories.map((aspect, idx) => (
                      <span key={idx} className="inline-flex border border-pink-900 rounded border-radius-4 px-4 py-1 m-1 items-center text-lg my-4 text-pink-600 hover:text-white hover:bg-blue-700">
                        { aspect.categoryName }
                      </span>
                    ))}
                  </div>
                  <div className="w-full grid w-full gap-2 md:grid-cols-2">
                    <span
                      className="inline-block border border-blue-300 text-white text-center bg-gradient-to-r from-blue-300 via-indigo-500 to-pink-400 hover:bg-gradient-to-r hover:from-pink-400 hover:via-indigo-600 hover:to-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <svg className="w-5 h-5 ml-9" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                    </span>
                    
                    <span className="inline-block border border-blue-300 text-white text-center bg-gradient-to-r from-blue-300 via-indigo-500 to-pink-400 hover:bg-gradient-to-r hover:from-pink-400 hover:via-indigo-600 hover:to-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                      <svg className="w-5 h-5 ml-9" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z">
                        </path>
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z">
                        </path>
                      </svg>
                    </span>
                  </div>
                </div>

              </CustomLink>
            </li>
          );
        })}
      </div>

      <Button variant="text">ReadMore</Button>
    </>
  );
}

export default PostList;