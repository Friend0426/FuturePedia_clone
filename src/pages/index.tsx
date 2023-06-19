import type { NextPage, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { ArticleJsonLd } from 'next-seo';
import PostList from '@/components/PostList';
import generateRSS from '@/lib/generateRSS';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/CommandPalette/useCommandPalettePostActions';
import LayoutPerPage from '@/components/LayoutPerPage';

import ConfirmationDialogRaw from '@/components/ConfirmationDialogRaw'
import { siteConfigs } from '@/configs/siteConfigs';
import React from 'react';

import useAutocomplete from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NewsState, NewsAction } from '@/reducer/newsReducer';
import { ThunkDispatch } from 'redux-thunk';
import loadFromServer from '@/action';
import { InputAdornment, OutlinedInput } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';

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

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const locale = context.locale!;

  const commandPalettePosts = getCommandPalettePosts();
  
  generateRSS();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['indexPage', 'common'])),
      commandPalettePosts,
    },
  };
};

const Home: NextPage<Props> = ({ commandPalettePosts }) => {
  
  const { t } = useTranslation(['indexPage', 'common']);

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

  const posts:NewsState[] = useSelector<NewsState[], NewsState[]>(state => state);  
  const dispatch = useDispatch<ThunkDispatch< NewsState[], {}, NewsAction> >();
  const [isEnd, setIsEnd] = useState(false);

  const scrollEvent = () => {
    setIsEnd((window.innerHeight + window.scrollY) + 50 >= document.body.offsetHeight) ;
  }

  useEffect( () => {
    loadFromServer(posts.length + 9, dispatch);
    window.addEventListener('scroll', scrollEvent);
  }, [] )

  useEffect( () => {
    console.log(isEnd);
    if(isEnd)
      loadFromServer(posts.length + 9, dispatch);
  }, [isEnd] )

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
      
      <OutlinedInput
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          borderRadius: "100px",
          marginBottom: "20px",
          paddingLeft: "12px",
        }}
      />
     
      <ConfirmationDialogRaw />
      <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        <PostList />
      </div>
    </LayoutPerPage>
  );
};

export default Home;
