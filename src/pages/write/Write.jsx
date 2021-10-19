import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Select from 'react-select';
import { blogApi } from '../../api/blogApi';
import { Context } from "../../context/Context";
import "./write.css";


export default function Write() {
    const photoDir = "https://blog2-api-demo.herokuapp.com/images/"
    const { search } = useLocation();
    const [title, setTitle] = useState("");
    const [description, setDesciption] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    const [post, setPost] = useState({})
    const [editMode, setEditMode] = useState(false);
    const [category, setCategory] = useState([]);
    const [selectedCat, setSelectedCat] = useState(null);
    const path = search ? search.split("=")[1] : null

    const getCat = (categories) => {
        return categories.map((c) => {
            return {
                value: c.name,
                label: c.name,
            }
        });
    }

    const handleSelect = (cat) => {
        console.log(cat)
        setSelectedCat(cat)
    }
    console.log(selectedCat)
    useEffect(() => {
        const fetchCat = async () => {
            const res = await blogApi.getCategories()
            setCategory(getCat(res))
            console.log(getCat(res))

        }
        fetchCat()
    }, [])

    useEffect(() => {
        const getPost = async () => {
            const res = await blogApi.getPosts(`/${path}`);
            setPost(res)
            setTitle(res.title)
            setDesciption(res.description)
            setSelectedCat(res.categories[0])
            setEditMode(true);
        }
        if (path) {
            getPost();
        }

    }, [path])
    const handleSubmit = async (e) => {
        console.log("dang up bai post.............")
        e.preventDefault();
        const post = {
            username: user.username,
            title,
            description,
            categories: [selectedCat.value]
        };
        if (file) {
            const photo = new FormData();
            const filename = Date.now() + file.name;
            photo.append("name", filename);
            photo.append("file", file);
            post.photo = filename;
            try {
                await blogApi.uploadFile(photo);
            } catch (error) {
                console.log(error)
            }
        }

        try {
            const res = await blogApi.createPost(post);
            window.location.replace("/posts/" + res._id);
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        console.log("dang up bai post.............")
        const post = {
            username: user.username,
            title,
            description,
            categories: [selectedCat.value]
        };
        if (file) {
            const photo = new FormData();
            const filename = Date.now() + file.name;
            photo.append("name", filename);
            photo.append("file", file);
            post.photo = filename;
            post.username = user.username
            try {
                await blogApi.uploadFile(photo);
            } catch (error) {
                console.log(error)
            }
        }

        try {
            const res = await blogApi.updatePost(path, {
                username: user.username,
                title: post.title,
                description: post.description,
                photo: post.photo,
                categories: post.categories
            });
            console.log(res)
            window.location.replace("/posts/" + res._id);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="write">
            {
                (post.photo && file === null) ? (
                    <img
                        className="writeImg"
                        src={photoDir + post.photo}
                        alt=""
                    />
                ) : file && (
                    <img
                        className="writeImg"
                        src={URL.createObjectURL(file)}
                        alt=""
                    />
                )
            }

            <form action="" className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">Chose your photo: </label>
                    <input type="file" id="fileInput" className="writeInput" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                {/* //category */}
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">category </label>
                    <Select
                        value={selectedCat}
                        onChange={handleSelect}
                        name="category"
                        options={category}
                        className="basic-multi-select writeInput"
                        classNamePrefix="select"
                    />
                </div>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">Title</label>
                    <input
                        value={title}
                        type="text"
                        className="writeInput"
                        placeholder="write your title"
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">Description</label>
                    <textarea
                        value={description}
                        className="writeInput writeText"
                        placeholder="write something..."
                        type="text"
                        onChange={(e) => setDesciption(e.target.value)}
                    />
                </div>
                {editMode ? (
                    <button className="btnSubmit" onClick={handleUpdate}>update</button>
                ) : (
                    <button className="btnSubmit" type="submit">Save</button>
                )
                }
            </form>
        </div>
    )
}
