import React from 'react'
import "./banner.css";

export default function Banner() {
    return (
        <div className="banner">
            <div className="bannerTitles">
                <span className="bannerTitleLg">BLOG APP</span>
            </div>
            <img
                className="bannerImg"
                src="https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
            />
        </div>
    );
}
