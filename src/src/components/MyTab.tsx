import { useState } from "react";
import { useRouter } from 'next/router';

import CustomLink from '@/components/CustomLink';
import formatDate from '@/lib/formatDate';

import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme, Theme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export interface PostForPostList {
  slug: string;
  date: string;
  title: string;
  description: string;
  path: string;
  socialImage: string;
  pricing: string;
}

type Props = {
  posts: PostForPostList[];
};


export default function MyTab({ posts = [] }: Props) {
  const { locale } = useRouter();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
 
      <Box sx={{ bgcolor: 'background.paper'}}>
        <AppBar position="static" >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="TOOLS" {...a11yProps(0)} />
            <Tab label="FAVOURITES" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className=" mt-4 p-2 px-4 border border-gray-200 rounded">
            <div className="p-4 py-2 rounded-lg">
              <a href="https://www.wsj.com/amp/articles/google-ceo-sundar-pichai-says-search-to-feature-chat-ai-2fa0f54c?ref=futurepedia" target="_blank" rel="nofollow noopener" className="text-black text-xl font-bold hover:underline">
                Google CEO Sundar Pichai Says Search to Include Chat AI
              </a>
            </div>
            <div className="p-4 inline-block">
              <p className="text-gray-500 text-sm mt-2">
                submitted by Community Member
              </p>
              <p className="text-gray-500 text-base">
                15 hours ago
              </p>
            </div>
            <div className="border border-pink text-xs rounded-lg mt-4 mr-4 px-2 py-1 inline-block">
            <svg className="inline-block mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M19 4h-2V3a1 1 0 00-2 0v1H9V3a1 1 0 00-2 0v1H5a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 15a1 1 0 01-1 1H5a1 1 0 01-1-1v-7h16zm0-9H4V7a1 1 0 011-1h2v1a1 1 0 002 0V6h6v1a1 1 0 002 0V6h2a1 1 0 011 1z" />
            </svg>
              <span>
                update
              </span>
            </div>
            <div className="border text-xs rounded-lg mt-4 px-2 py-1 inline-block">
              Interesting
            </div>
          </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="mt-4 p-4  rounded">
          <div className="divide-y divide-blue-500 transition-colors dark:divide-gray-200 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {!posts.length && 'No posts found.'}
            {posts.map((post) => {
              const { slug, date, title, description, path, socialImage,pricing} = post;
              return (
                // <li key={slug} className="group transition-colors">
                //   <CustomLink href={path}>
                //     <article className="space-y-2 rounded-xl p-4 transition-colors group-hover:bg-gray-100 dark:group-hover:bg-gray-800 xl:grid xl:grid-cols-4  xl:items-baseline xl:space-y-0">
                //       <div className="space-y-3 xl:col-span-3">
                //         <div>
                //           <h3 className="text-lg font-bold tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:text-xl md:text-2xl">
                //             {title}
                //           </h3>
                //         </div>
                //         <div className="prose prose-sm max-w-none text-gray-500 transition-colors dark:text-gray-400 md:prose-base">
                //           {description}
                //         </div>
                //       </div>
                //     </article>
                //   </CustomLink>
                // </li>
                <a key={slug} className="group transition-colors border border-gray-200 rounded-lg shadow-2xl">
                  <CustomLink href={path}>
                    <div className="relative aspect-h-1 h-100 min-h-100 max-h-100 w-100 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={socialImage}
      //                  alt={product.imageAlt}
                        className="h-full w-full object-cover object-center group-hover:opacity-75" style={{ height: '160px' }}
                      />
                      <span className="absolute top-0 py-4 px-1 right-8 w-14 h-20 rounded text-center broder-radius-8 bg-yellow-300 shadow-lg dark:border-gray-800 text-yellow shadow">$999</span>
                    </div>
                    <div className=" px-5 py-3 h-100">
                      <span className="block text-2xl mr-4 mb-2 text-red-500 dark:text-red">  
                        <svg
                          className="inline-block"
                          viewBox="20 100 1124 1024"
                          fill="currentColor"
                          height="1em"
                          width="1em"
                        >
                          <path d="M834.1 469.2A347.49 347.49 0 00751.2 354l-29.1-26.7a8.09 8.09 0 00-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9-11 29.5-26.8 56.9-47 81.5a295.64 295.64 0 01-47.5 46.1 352.6 352.6 0 00-100.3 121.5A347.75 347.75 0 00160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0075.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 00760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0027.7-136c0-48.8-10-96.2-29.9-140.9z" />
                        </svg> 
                        298 
                      </span>

                      <span className="relative text-gray-500 transition-colors dark:text-gray-400 mt-1 text-lg font-medium text-gray-900">{title}
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
                      </svg></span>           
                      <h1 className="text-gray-500 w-64 transition-colors dark:text-gray-400 my-4 text-medium line-clamp-2 text-gray-700" style={{ height: '50px' }}>{description}</h1>
                    
                    </div>
                    <div className="px-5 py-3 h-100">
                      <button className="block border border-gray-400 rounded broder-radius-4 px-4 py-2 cursor-not-allowed text-sm disabled:opacity-50 disabled:cursor-not-allowed">
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
                        <a href="#" className="inline-flex border border-pink-900 rounded broder-radius-4 px-4 py-1 items-center text-lg my-4 text-pink-600 hover:text-white hover:bg-blue-700">
                            #e-commerce
                            {/* <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg> */}
                        </a>
                      </div>
                      <div className="w-full grid w-full gap-2 md:grid-cols-2">
                        <a className="inline-block border border-blue-300 text-white text-center bg-gradient-to-r from-blue-300 via-indigo-500 to-pink-400 hover:bg-gradient-to-r hover:from-pink-400 hover:via-indigo-600 hover:to-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">

                            <svg className="w-5 h-5 ml-9" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                        </a>
                        <a className="inline-block border border-blue-300 text-white text-center bg-gradient-to-r from-blue-300 via-indigo-500 to-pink-400 hover:bg-gradient-to-r hover:from-pink-400 hover:via-indigo-600 hover:to-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <svg className="w-5 h-5 ml-9" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                        </a>
                      </div>
                    </div>
                  </CustomLink>
                </a>
              );
            })}
          </div>
          </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
  );
};

