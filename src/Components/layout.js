import FooterBar from '../app/elemets/footerbar';

export default function Layout({ children }) {
  return (
    <>
      <div className="content">
        {children}
      </div>
      <FooterBar />
    </>
  );
}
//TODO wtf is it???!!!?#!?#!@.3