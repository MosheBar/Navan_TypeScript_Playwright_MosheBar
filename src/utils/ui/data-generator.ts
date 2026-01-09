import { PassengerDetails } from './types';

export function generateRandomPassenger(): PassengerDetails {
    const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana'];
    const cities = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney'];
    const states = ['NY', 'CA', 'TX', 'FL', 'WA'];
    const cardTypes: PassengerDetails['cardType'][] = ['Visa', 'American Express', 'Diner\'s Club'];

    const randomStr = Math.random().toString(36).substring(7);
    
    return {
        firstName: `${firstNames[Math.floor(Math.random() * firstNames.length)]}_${randomStr}`,
        address: `${Math.floor(Math.random() * 999) + 1} Main St`,
        city: cities[Math.floor(Math.random() * cities.length)],
        state: states[Math.floor(Math.random() * states.length)],
        zipCode: Math.floor(10000 + Math.random() * 90000).toString(),
        cardType: cardTypes[Math.floor(Math.random() * cardTypes.length)],
        cardNumber: Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString(),
        cardMonth: (Math.floor(Math.random() * 12) + 1).toString(),
        cardYear: (new Date().getFullYear() + Math.floor(Math.random() * 5)).toString(),
        nameOnCard: `TestUser ${randomStr}`
    };
}
