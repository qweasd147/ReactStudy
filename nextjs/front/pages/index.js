import Layout from '../components/Layout';
import axios from 'axios';

const Index = ({data})=>(
    <Layout>
        <div>
            <p>init project with nextjs</p>
            <p>Data : {data}</p>
        </div>
    </Layout>
);

Index.getInitialProps = async ()=>{
    const res = await axios.get('http://localhost:8080/api/v1/data1');
    const data = res.data;

    return {
        data
    }
}

export default Index;