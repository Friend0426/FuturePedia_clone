import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ArticleJsonLd } from 'next-seo';
import MyTab from '@/components/MyTab';
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

const Favorites: NextPage<Props> = ({ posts, commandPalettePosts }) => {
  const { t } = useTranslation(['indexPage', 'common']);

  useCommandPalettePostActions(commandPalettePosts);

  return (
    <LayoutPerPage>
      <ArticleJsonLd
        type="Blog"
        url={siteConfigs.fqdn}
        title={siteConfigs.title}
        images={[siteConfigs.bannerUrl]}
        datePublished={siteConfigs.datePublished}
        authorName={siteConfigs.author}
        description={siteConfigs.description}
      />

      <div className="my-12 space-y-2 text-pink-400 transition-colors dark:prose-dark md:prose-lg md:space-y-5">
        <h2 className="text-center">{t('Your Favourites')}</h2>
        <h4 className="text-center">{t('These are the tools and posts you have favourited. You can remove them from your favourites by clicking the bookmark icon.')}</h4>
      </div>
      <div>
        <MyTab posts={posts}/>
      </div>
      {/* <form className="group relative">
          <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
             </svg>
          <input className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Filter projects..." />
      </form> */}
      <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        {/* <div className="prose prose-lg my-8 dark:prose-dark">
          <h2>{t('latest-posts')}</h2>
        </div> */}

        {/* <PostList posts={posts} /> */}
      </div>
    </LayoutPerPage>
  );
};

export default Favorites;

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