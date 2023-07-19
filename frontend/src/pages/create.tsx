import Layout from '../components/layout';
import SmartForm from '../components/smartform';

export const Create = () => {
    return (
        <Layout>
            <section id="create">
                <SmartForm topic='machine' formType='create' rawData='' />
            </section>
        </Layout>
    );
};

export default Create;
