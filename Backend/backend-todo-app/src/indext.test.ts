import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { serve} from '@hono/node-server';
import { PrismaClient } from "@prisma/client";
import { app} from './index';

const  prisma = new PrismaClient();
let server: any;

beforeAll(async ()=>{
    server = serve({
        fetch:app.fetch,
        port:3001
    });
});

afterAll(async ()=>{
    await prisma.$disconnect();
    // server.close();
});

describe('API Endpoints', ()=>{
    let authToken: string;
    let userId: 'string';

    //Test authenication endpoints
    it('should register a new user', async () =>{
        const response = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'testuser@gmail.com',
                password: 'password123',
                name:'Test user'
            })
        });

    const data =  await response.json();
    expect(response.status).toBe(200);
    expect(data.user).toBeDefined();
    expect(data.token).toBeDefined();
    authToken = data.token;
    userId = data.user.id;    
    });

    //Test login

    it('should login with valid credentials', async () => {
        const response = await fetch('http://localhost:3001/api/auth/login',{
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'testuser@gmail.com',
                password: 'password123'
            })
        });
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.token).toBeDefined();
    });

    //Test creating a todo
    it('should create a new todo', async() => {
        const response = await fetch('http://localhost:3001/api/todos', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                title: 'Test todo',
                description: 'Test Description',
                priority: 'MEDIUM'
            })
        });
        const data = await response.json();
        expect(data.status).toBe(201);
        expect(data.title).toBe('Test todo')
    });

   //Test getting todos
   it('Should get all todos', async () =>{
    const response = await fetch('http://localhost:3001/api/todos', {
        headers:{
            'Authorization': `Bearer ${authToken}`
        }
    });
    const data =  await response.json();
    expect(data.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
   });
   
   //Testing creating a category
   it('should create a new category', async() => {
        const response = await fetch('http://localhost:3001/api/categories', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                name: 'Test Category',
                priority: '#FF0000'
            })
        });
        const data = await response.json();
        expect(data.status).toBe(201);
        expect(data.name).toBe('Test Category')
    });

   //Test getting Categories
   it('Should get all todos', async () =>{
    const response = await fetch('http://localhost:3001/api/categories', {
        headers:{
            'Authorization': `Bearer ${authToken}`
        }
    });
    const data =  await response.json();
    expect(data.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
   });

   //clean up
   afterAll( async () =>{
    await prisma.todo.deleteMany({
        where: {userId}
    });
    await prisma.category.deleteMany({
        where : {userId}
    });
    await prisma.user.delete({
        where: { id: userId }
    });
   });
});