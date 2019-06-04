import Layout from '../components/Layout';
import axios from 'axios';

const Page1 = ({data})=>(
    <Layout>
        <div>
            <p>page1</p>
            <p>Data : {data}</p>
        </div>
    </Layout>
);

Page1.getInitialProps = async ()=>{
    const res = await axios.get('http://localhost:8080/api/v1/data2');
    const data = res.data;

    return {
        data
    }
}

export default Page1;