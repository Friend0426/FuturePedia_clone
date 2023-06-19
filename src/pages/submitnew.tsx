import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { ArticleJsonLd } from 'next-seo';
import Tabs from '@/components/MyTab';
import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/CommandPalette/useCommandPalettePostActions';
import LayoutPerPage from '@/components/LayoutPerPage';
import PostList, { PostForPostList } from '@/components/PostList';
import { siteConfigs } from '@/configs/siteConfigs';
import { allPostsNewToOld } from '@/lib/contentLayerAdapter';
import generateRSS from '@/lib/generateRSS';

type PostForIndexPage = PostForPostList;

type Props = {
  posts: PostForIndexPage[];
  commandPalettePosts: PostForCommandPalette[];
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const locale = context.locale!;

  const commandPalettePosts = getCommandPalettePosts();
  const posts = allPostsNewToOld.map((post) => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    description: post.description,
    path: post.path,
    socialImage: post.socialImage,
    pricing: post.pricing,
  })) as PostForIndexPage[];

  
  generateRSS();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['indexPage', 'common'])),
      posts,
      commandPalettePosts,
    },
  };
};

const submitnew: NextPage<Props> = ({ posts, commandPalettePosts }) => {
  const { t } = useTranslation(['indexPage', 'common']);

  useCommandPalettePostActions(commandPalettePosts);

  return (

    <div className="flex items-center justify-start bg-white">
      <div className="mx-auto w-full">
        <h1 className="text-4xl font-medium mt-14">Submit</h1>
        <p className="mt-3"> Once approved, your submission will be added to the feed.</p>
        
        <form action="https://api.web3forms.com/submit" className="mt-10">
          <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" /> 

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="mt-5 relative z-0 col-span-2">
              <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Title:Please Describe the content 1-2 sentence</label>
            </div>
            <div className="mt-5 relative z-0">
              <input type="text" name="email" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Link to the content:(http://www.wired.com)</label>
            </div>
            <div className="mt-5 relative z-0">
            <Multiselect
                displayValue="key"
                onKeyPressFn={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                onSearch={function noRefCheck(){}}
                onSelect={function noRefCheck(){}}
                options={[
                    {
                    cat: 'Group 1',
                    key: 'Interesting'
                    },
                    {
                    cat: 'Group 1',
                    key: 'Video'
                    },
                    {
                    cat: 'Group 1',
                    key: 'Research'
                    },
                    {
                    cat: 'Group 2',
                    key: 'Update'
                    },
                    {
                    cat: 'Group 2',
                    key: 'Opinion'
                    },
                    {
                    cat: 'Group 2',
                    key: 'Avatar'
                    },
                    {
                    cat: 'Group 2',
                    key: 'Data'
                    }
                ]}
                selectedValues={[
                    {
                    cat: 'Group 1',
                    key: 'Video'
                    },
                    {
                    cat: 'Group 1',
                    key: 'Interesting'
                    }
                ]}
                />       
            </div>
            
            {/* <WYSIWYGEditor/> */}
          </div>
          <button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default submitnew;

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