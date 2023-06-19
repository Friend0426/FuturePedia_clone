import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function LatestAinews() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };
  return (

    <div>
        <div className="my-12 space-y-2 text-blue-600 transition-colors dark:prose-dark md:prose-lg md:space-y-5">
             <h2 className="text-center">Latest AI News | Updates | This Week</h2>
            <h4 className="text-center">10 News.</h4>
        </div>
        <div className="m-5">
            <Button variant="contained" href="/submitnew">
                submit
            </Button>
        </div>
        <Box sx={{ minWidth: 120 }} className="inline-block mr-12 flex-none">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">time</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                >
                <MenuItem value={10}>Today</MenuItem>
                <MenuItem value={20}>This week</MenuItem>
                <MenuItem value={30}>This month</MenuItem>
                <MenuItem value={30}>All time</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }} className="inline-block flex-none sm:w-10">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                >
                <MenuItem value={10}>video</MenuItem>
                <MenuItem value={20}>music</MenuItem>
                <MenuItem value={30}>avatar</MenuItem>
                <MenuItem value={30}>setom</MenuItem>

                </Select>
            </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }} className="inline-block flex-none float-right">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Box>
        
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
        <div className=" mt-4 p-2 px-4 border border-gray-200 rounded">
            <div className="p-4 py-2 rounded-lg">
            <a href="https://www.wsj.com/amp/articles/google-ceo-sundar-pichai-says-search-to-feature-chat-ai-2fa0f54c?ref=futurepedia" target="_blank" rel="nofollow noopener" className="text-black text-xl font-bold hover:underline">
            Elon Musk buys tons of GPUs for Twitter AI project 
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
        <div className=" mt-4 p-2 px-4 border border-gray-200 rounded">
            <div className="p-4 py-2 rounded-lg">
            <a href="https://www.wsj.com/amp/articles/google-ceo-sundar-pichai-says-search-to-feature-chat-ai-2fa0f54c?ref=futurepedia" target="_blank" rel="nofollow noopener" className="text-black text-xl font-bold hover:underline">
            44 of the most promising generative-artificial-intelligence startups of 2023, according to VCs
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
        <div className=" mt-4 p-2 px-4 border border-gray-200 rounded">
            <div className="p-4 py-2 rounded-lg">
            <a href="https://www.wsj.com/amp/articles/google-ceo-sundar-pichai-says-search-to-feature-chat-ai-2fa0f54c?ref=futurepedia" target="_blank" rel="nofollow noopener" className="text-black text-xl font-bold hover:underline">
            China releases rules for generative AI like ChatGPT after Alibaba, Baidu launch services
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
    </div>
    
  );
}


/*
This code is written in TypeScript and uses the Next.js framework along with the next-i18next library to handle internationalization (i18n). The code outlines a blog-style homepage that lists a series of blog posts:

First, import statements are used to import required libraries, components, and configuration files. This includes the NextPage type and GetStaticProps function from 'next', functions from 'next-i18next' library, and various components and configurations from the project.

Type definitions are set for the component's props:

PostForIndexPage: a Type Alias representing a Post object for the index page.
Props: a Type Alias representing the props for the Home component, including an array of PostForIndexPage and PostForCommandPalette.
getStaticProps: The function is defined as an async function to fetch the required data to generate the static props of the page during the build time. This function fetches the blog posts and command palette posts, generates the RSS feed, and returns the serverSideTranslations for the specified locale.

Home: The main functional Next.js page component that receives the posts and renders the layout. It includes:

useTranslation hook to translate the content based on the user's language.
useCommandPalettePostActions hook to perform actions on command palette posts.
ArticleJsonLd: Component to add structured data for SEO purposes.
PostList: Component rendering the list of posts received.
Finally, export Home as the default component.

To add a favorite part with Tab Bars that have "New" and "Central" tabs, you can follow these steps:

Import a TabBars component or create one if you haven't already.
Update the Props type definition to include an array of favorite posts, e.g., { posts: PostForIndexPage[], commandPalettePosts: PostForCommandPalette[], favoritePosts: PostForIndexPage[] }.
Modify the getStaticProps function to fetch your favorite posts and pass them to the component in the props object.
Inside the Home component, include the TabBars component, passing your fetched favorite posts as a prop.
Update the TabBars component to show the favorite posts in the "New" tab if they meet that criteria, and in the "Central" tab otherwise.
That's an outline of how you can modify this code to include a favorites section with "New" and "Central" tabs.
*/