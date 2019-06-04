import Header from './Header';
import Footer from './Footer';

export default ({children})=>{
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
};;