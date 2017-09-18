﻿export interface BryterUser {
    userID: number;
    username: string;
    companyName: string;
    companyID: number;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: number;
    country: string;
    title: string;
    experienceLevel: string;
    managerName: string;
    managerPhone: number;
    managerEmail: string;
    phone: number;
    email: string;
    rating: string;
    photo: string;
    yearsWithCompany: number;
    approvalRate: number;
    completionRate: number;
    retainingRate: number;
    assignedCityLicenseIDs: string;
    statusID: number;
    statusName: string;
    createdOn: Date;
    createdOnStr: string;
    bryterUserTypeID: number;
    bryterUserTypeName: string;
}