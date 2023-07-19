import Loading from './components/loading';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './context/datacontext';
import { useEffect, Suspense, lazy } from 'react';
import { SchemaProvider } from './context/schemacontext';

export default function AppRoutes() {
    const Home = lazy(() => import('./pages/home'));
    const Create = lazy(() => import('./pages/create'))
    const Edit = lazy(() => import('./pages/edit'))

    const ScrollToTopPage = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    };

    return (
        <DataProvider>
            <SchemaProvider>
                <ScrollToTopPage />
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/edit/:id" element={<Edit />} />
                    </Routes>
                </Suspense>
            </SchemaProvider>
        </DataProvider>
    );
}
