import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [greeting, setGreeting] = useState('');
    const username = 'User'; // Replace this with dynamic username if needed

    useEffect(() => {
        const fetchGreeting = async () => {
            const response = await fetch('https://localhost:3001/api/greet', {
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                credentials: 'include', // Include credentials (cookies)
              });
            const result = await response.json();
            setGreeting(result.message);
        };

        fetchGreeting();
    }, [username]);


    return (
        <div>
            <h1>Dashboard</h1>
            <h2>{greeting}</h2>
        </div>
    );
};

export default Dashboard;
