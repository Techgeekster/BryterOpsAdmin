export interface Retailer {
    retailerID: number;
    retailerName: string;
    ein: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: number;
    country: string;
    phone: number;
    website: string;
    email: string;
    contact: string;
    approvalRate: number;
    completionRate: number;
    retainingRate: number;
    assignedCityLicenseIDs: string;
    providerIDs: string;
    statusID: number;
    statusName: string;
}