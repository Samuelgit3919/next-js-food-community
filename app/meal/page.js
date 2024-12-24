import Link from 'next/link'
import React, { Suspense } from 'react'
import classes from './page.module.css'
import MealGrid from '@/components/meals/meals-grid'
import { getMeals } from '@/lib/meals'

async function Meals() {
    const meals = await getMeals();
    return <MealGrid meals={meals} />
}

export default function MealsPage() {

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
                <Suspense fallback={<div className={classes.loader}></div>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    )
}

