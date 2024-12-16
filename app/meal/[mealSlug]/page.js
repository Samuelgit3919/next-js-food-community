import React from 'react'

const MealsPage = ({ params }) => {
    return (
        <div style={{ textAlign: "center" }}>
            <p>{params.slug}</p>
        </div>
    )
}

export default MealsPage
