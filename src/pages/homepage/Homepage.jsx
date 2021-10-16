import Banner from '../../components/banner/Banner'
import Sidebar from '../../components/sidebar/Sidebar'
import Posts from '../../components/posts/Posts'
import "./homepage.css"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'



export default function Homepage() {

    const [posts, setPosts] = useState([]);
    const { search } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/posts" + search)
            setPosts(res.data)
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
