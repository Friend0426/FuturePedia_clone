import { useTranslation } from 'next-i18next';
import CommandPaletteToggle from '@/components/CommandPaletteToggle';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import CustomLink from '@/components/CustomLink';
import MobileNav from '@/components/MobileNav';
import SectionContainer from '@/components/SectionContainer';
import ThemeSwitch from '@/components/ThemeSwitch';
import { headerConfigs } from '@/configs/headerConfigs';
import GoogleButton from 'react-google-button'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


export default function Header() {
  const { t } = useTranslation(['common']);
  const [googleAccessToken, setGoogleAccessToken] = useState<string>('');

  const loginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('tokenId' in response) {
      setGoogleAccessToken(response.tokenId);
    }
  }

  return (
    <header className="sticky top-0 z-10 border-b border-slate-900/10 bg-white/70 pb-2 backdrop-blur transition-colors dark:border-slate-50/[0.06] dark:bg-gray-900/60">
      <SectionContainer>
        <div className="flex items-baseline justify-between">
          <div>
            <CustomLink href="/" aria-label={headerConfigs.title}>
                { <div className="transform translate-x-[-10px] translate-y-[20px] h-20 block w-164 ">
                    <img src="/images/robi-2-0.gif" className="object-cover w-full h-full" alt="Your image"/>
                </div> }
            </CustomLink>
          </div>

          <div className="flex items-center text-base leading-5 sm:gap-1">
            <div className="hidden gap-1 sm:flex">
              {headerConfigs.navLinks.map((link) => (
                <CustomLink
                  key={link.title}
                  href={link.href}
                  className="rounded p-3 font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  {t(link.title)}
                </CustomLink>
              ))}
            </div>

            {/* <LanguageSwitch /> */}
            <ThemeSwitch />
            <CommandPaletteToggle />
            <MobileNav />
            { googleAccessToken.length && 
              (<GoogleLogin
                clientId="955630342713-55eu6b3k5hmsg8grojjmk8mj1gi47g37.apps.googleusercontent.com"
                buttonText=''
                
                // render={(renderProps) => (
                //   <GoogleButton label='Login with Google' />
                // )}
                onSuccess={loginSuccess}
                onFailure={(response: any) => {
                  setGoogleAccessToken('');
                }}
                cookiePolicy={'single_host_origin'}
                responseType='code,token'
              />)
            }
          </div>
        </div>
      </SectionContainer>
    </header>
  );
}
