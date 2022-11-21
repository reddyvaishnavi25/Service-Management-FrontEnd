import { customer } from "./customer";

export class address{
    addressId: number;
    streetAddress: string;
    city: string;
    state: string;
    country: string
    zip : number;
    customer:customer;
}