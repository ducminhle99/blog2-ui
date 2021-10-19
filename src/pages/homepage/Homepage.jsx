import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { blogApi } from '../../api/blogApi'
import Banner from '../../components/banner/Banner'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import "./homepage.css"



export default function Homepage() {

    const [posts, setPosts] = useState([]);
    const { search } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await blogApi.getPosts("" + search);
            setPosts(res)
        }
        fetchPosts();
    }, [search])
    return (
        <>
            <Banner />
            <div className="home">
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </>

    )
}
