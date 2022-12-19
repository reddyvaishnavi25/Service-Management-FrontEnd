import { Customer } from "./customer";

export interface Address {
    addressId: number;
    streetAddress: string;
    city: string;
    state: string;
    country: string
    zip: number;
    customerId: number;
}