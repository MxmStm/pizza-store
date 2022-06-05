import React from "react"
import ContentLoader from "react-content-loader"


export const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#e5e1e1"
        foregroundColor="#ecebeb"
    >
        <circle cx="140" cy="120" r="120"/>
        <rect x="0" y="310" rx="10" ry="10" width="280" height="88"/>
        <rect x="125" y="415" rx="22" ry="22" width="150" height="45"/>
        <rect x="0" y="260" rx="10" ry="10" width="280" height="27"/>
        <rect x="0" y="425" rx="10" ry="10" width="108" height="27"/>
    </ContentLoader>
)
