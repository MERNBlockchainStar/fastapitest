import Header from './header';
import Footer from './footer';
import { useLocation } from 'react-router-dom';
import { LayoutProps } from '../types/layouttypes';

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            <Header />
                <div className={isHomePage ? '' : 'container'}>{children}</div>
            <Footer />
        </>
    );
};

export default Layout;
