import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { ArticleJsonLd } from 'next-seo';
import PostList from '@/components/PostList';

import {
  PostForCommandPalette,
} from '@/components/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/CommandPalette/useCommandPalettePostActions';
import LayoutPerPage from '@/components/LayoutPerPage';

import ConfirmationDialogRaw from '@/components/ConfirmationDialogRaw'
import { siteConfigs } from '@/configs/siteConfigs';
import React, { useEffect } from 'react';

import useAutocomplete from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import loadFromServer from '@/action';
import { NewsState, NewsAction } from '@/reducer/newsReducer';
import { ThunkDispatch } from 'redux-thunk';

const top100Films = [
  { title: 'Ingest AI', year: 1994 },
  { title: 'StockImg AI', year: 1972 },
  { title: 'GooGPT', year: 1974 },
  { title: 'Audyo', year: 2008 },
  { title: 'Durable', year: 1957 },
  { title: "Upword", year: 1993 }
];

const Input = styled('input')(({ theme }) => ({
  width: '100%',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto',
  height:30,
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  color: theme.palette.mode === 'light' ? '#000' : '#fff',
}));

const Listbox = styled('ul')(({ theme }) => ({
  padding: 0,
  zIndex: 1,  
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  overflow: 'auto',
  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  '& li.Mui-focused': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
}));

type Props = {
  commandPalettePosts: PostForCommandPalette[];
};

const Home: NextPage<Props> = ({ commandPalettePosts }) => {
  
  const { t } = useTranslation(['indexPage', 'common']);
  const posts:NewsState[] = useSelector<NewsState[], NewsState[]>(state => state);
  const dispatch = useDispatch<ThunkDispatch< NewsState[], {}, NewsAction> >();

  useCommandPalettePostActions(commandPalettePosts);
  const {
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: top100Films,
    getOptionLabel: (option) => option.title,
  });

  useEffect( () => {
    loadFromServer(posts.length + 9, dispatch);
  }, [] )

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
      
      <div className="my-12 space-y-2 transition-colors dark:prose-dark md:prose-lg md:space-y-5">
        <h2 className="text-center">{t('90,000+, 190,000+')}</h2>
        <h1 className="text-center">{t('Robi-rada')}</h1>
        <h3 className="text-center">{t('THE LARGEST AI TOOLS DIRECTORY, UPDATE DAILY')}</h3>
      </div>
      <div className="mb-5 px-5 py-4 flex items-center" style={{ alignItems: 'center', width: '100%', borderRadius: '100px', backgroundColor: '#ffffff' }}>
      {/* grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 */}
        <span className='flex-none'>
          <svg
            className='text-red-600 inline-block'
            viewBox="0 0 24 24"
            fill="currentColor"
            height="2em"
            width="2em"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        </span>
        <div className='flex-auto w-64 px-2 inline-block'>
          <Input placeholder="............" {...getInputProps()} />          

          {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {(groupedOptions as typeof top100Films).map((option, index) => (
              <li {...getOptionProps({ option, index })}>{option.title}</li>
            ))}
          </Listbox>
        ) : null}          
        </div>
        <Button className="flex-none my-5" variant="outlined" color="error">
          search
        </Button>

      </div>
     
      <ConfirmationDialogRaw />
      <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        <PostList />
      </div>
    </LayoutPerPage>
  );
};

export default Home;
