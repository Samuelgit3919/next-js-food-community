import Link from 'next/link'
import React from 'react'
import classes from './page.module.css'
import MealGrid from '@/components/meals/meals-grid'

const ShareMeal = () => {
    return (
        <>
            <header className={classes.header}>
                <h1>Delicious meals, created</h1>
                <span className={classes.highlight}>by you</span>
                <p>Choose your favorite recipe and cook it yourself. It is easy and fun!
                </p>
                <p className={classes.cta}>
                    <Link href='/meal/share'>
                        Share your favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <MealGrid meals={[]} />
            </main>
        </>
    )
}

export default ShareMeal
