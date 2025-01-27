import sql from 'better-sqlite3';  
import xss from 'xss';  
import slugify from 'slugify';  
import fs from 'node:fs';  
import path from 'node:path';  

const db = sql('meals.db');  

export async function getMeals() {  
    // Simulate a delay for loading meals  
    await new Promise(resolve => setTimeout(resolve, 3000));  
    return db.prepare('SELECT * FROM meals').all();  
}  

export function getMeal(slug) {  
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);  
}  

export async function saveMeal(meal) {  
    // Generate a slug from the meal title  
    meal.slug = slugify(meal.title, { lower: true });  
    meal.instructions = xss(meal.instructions);  

    // Handle image saving  
    const extension = meal.image.name.split('.').pop();  
    const fileName = `${meal.slug}.${extension}`;  
    const filePath = path.join('public', 'images', fileName);  

    // Check for existing slug and generate a unique one if necessary  
    let uniqueSlug = meal.slug;  
    let counter = 1;  

    while (db.prepare('SELECT * FROM meals WHERE slug = ?').get(uniqueSlug)) {  
        uniqueSlug = `${meal.slug}-${counter}`;  
        counter++;  
    }  

    meal.slug = uniqueSlug;  // Update the meal object with the unique slug  

    try {  
        // Create a writable stream to save the image  
        const stream = fs.createWriteStream(filePath);  
        const bufferImage = await meal.image.arrayBuffer();  

        // Write the image to the file  
        stream.write(Buffer.from(bufferImage), (error) => {  
            if (error) {  
                throw new Error("Saving image failed!");  
            }  
        });  

        meal.image = `/images/${fileName}`;  // Update the meal object with the image path  

        // Insert the meal into the database  
        db.prepare(`  
            INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)   
            VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)  
        `).run(meal);  
    } catch (error) {  
        console.error("Error saving meal:", error);  
        throw new Error("Failed to save meal. Please try again.");  
    }  
}