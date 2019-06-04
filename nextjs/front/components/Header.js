import Link from 'next/link';

export default ()=>{
    return (
        <div>
            <Link href="/"><a>home</a></Link>
            <Link href="/page1"><a>page1</a></Link>
        </div>
    );
};