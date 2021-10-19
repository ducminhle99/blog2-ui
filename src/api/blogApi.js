import axiosClient from "./axiosClient";

export const blogApi = {
    getPosts: (params) => {
        const url = `/posts${params}`;
        return axiosClient.get(url);
    },

    deletePost: (params, username) => {
        const url = `/posts/${params}`;
        return axiosClient.delete(url, {
            data: { username: username },
        })
    },

    uploadFile: (file) => {
        const url = "/upload";
        return axiosClient.post(url, file);
    },

    createPost: (post) => {
        const url = "/posts";
        return axiosClient.post(url, post);
    },

    updatePost: (params, post) => {
        const url = `/posts/${params}`;
        return axiosClient.put(url, post);
    },

    getCategories: () => {
        const url = "/categories";
        return axiosClient.get(url)
    },
    getUserByUsername: (params) => {
        const url = `/users?user=${params}`;
        return axiosClient.get(url)
    },
    updateUser: (params, user) => {
        const url = `/users/${params}`;
        return axiosClient.put(url, user);
    },

    register: (user) => {
        const url = "/auth/register";
        return axiosClient.post(url, user)
    },

    login: (user) => {
        const url = "/auth/login";
        return axiosClient.post(url, user)
    }
}