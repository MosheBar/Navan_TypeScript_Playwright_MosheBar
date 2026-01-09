export enum TravelCity {
    Paris = "Paris",
    Philadelphia = "Philadelphia",
    Boston = "Boston",
    Portland = "Portland",
    SanDiego = "San Diego",
    MexicoCity = "Mexico City",
    SaoPaulo = "São Paulo",
    BuenosAires = "Buenos Aires",
    Rome = "Rome",
    London = "London",
    Berlin = "Berlin",
    NewYork = "New York",
    Dublin = "Dublin",
    Cairo = "Cairo"
}

export interface FlightDetails {
    price: string;
    flightNumber: string;
}

export interface PassengerDetails {
    firstName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    cardType: 'Visa' | 'American Express' | 'Diner\'s Club';
    cardNumber: string;
    cardMonth: string;
    cardYear: string;
    nameOnCard: string;
}

export interface BookingConfirmation {
    id: string;
    status: string;
    amount: string;
    cardNumber: string;
    expiration: string;
    authCode: string;
    date: string;
}
