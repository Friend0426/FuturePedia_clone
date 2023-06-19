import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionContainer from '@/components/SectionContainer';

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  return (
    // <div className="flex min-h-screen w-full flex-col justify-between">
     <div  className=" blur-bg flex min-h-screen w-full flex-col justify-between" style={{backgroundImage: "url('/images/11.png')"}}>
      <div>
        <Header />

        <SectionContainer>
          <main className="mb-auto">{children}</main>
        </SectionContainer>
      </div>

      <Footer />
    </div>
  );
};

export default LayoutWrapper;
