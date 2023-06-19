import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Multiselect from 'multiselect-react-dropdown';
const steps = ['Startup Details', 'Additional Details'];


export default function submittool() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
 
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {activeStep===0?
          <div className="flex  items-center justify-start bg-white mb-4 mt-4 ">
            <div className="mx-auto w-full">
              <h2 className="text-3xl font-medium">Submit your tool.</h2>
              <p className="mt-3">We try to review all tools within 7 days and add it to the directory.</p>
              
              <form action="https://api.web3forms.com/submit" className="mt-10">
              
                <div className='p-5 my-2 border border-yellow-400'>
                  <p >Info</p>
                  <p className="mt-3 text-sm"> If you have already submitted and want to check the status of your tool, please email me at contact@futurepedia.io</p>    
                </div>
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" /> 

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="mt-5 relative z-0">
                    <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Tool name</label>
                  </div>
                  <div className="mt-5 relative z-0">
                    <input type="text" name="email" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Website Url</label>
                  </div>
                <div className="mt-5 relative z-0 col-span-2">
                    <input type="text" name="email" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Tool's short description (Optional)</label>
                  </div>            
                  {/* <div className="mt-5 relative z-0 col-span-2">
                    <textarea name="message" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" "></textarea>
                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Tool Description (Optional)</label>
                  </div> */}
                </div>
              </form>
            </div>
          </div>:
          <div className="flex items-center justify-start bg-white">
            <div className="mx-auto w-full">
              <h1 className="text-4xl font-medium mt-14">Additional details</h1>
              
              <form action="https://api.web3forms.com/submit" className="mt-10">
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" /> 

                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="mt-5 relative z-0 col-span-2">
                    <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Title:Please Describe the content 1-2 sentence</label>
                  </div>
                  <div className="mt-5 relative z-0">
                    <label className='text-gray-500'>
                      Select categories (max 3)
                    </label>
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
                      style={{
                        multiselectContainer: {
                          background: 'white'
                        }
                      }}
                      />       
                  </div>
                  <div className="mt-5 relative z-0">
                   <label className='text-gray-500'>
                    Select features (optional)
                    </label>
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
                  <div className="mt-5 relative z-0">
                  <label className='text-gray-500'>
                    Pricing - Select freemium if your tool has both paid and free versions
                    </label>
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
                <button type="submit" className="mt-5 rounded-md bg-blue-500 px-10 py-2 text-white">Submit tool</button>
              </form>
            </div>
          </div>        
          }  
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
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