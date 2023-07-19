import { useParams } from 'react-router-dom';
import Layout from '../components/layout';
import SmartForm from '../components/smartform';

export const Edit = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <Layout>
            <section id="update">
                <SmartForm topic='machine' formType='update' rawData={id} />
            </section>
        </Layout>
    );
};

export default Edit;
