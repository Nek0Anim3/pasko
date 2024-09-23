import FooterBar from '../elemets/footerbar';

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
