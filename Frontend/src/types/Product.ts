

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    location: string;
    imageUrl: string;
    contactInfo: string;
    isSold: boolean;
    isLiked: boolean;
    datePosted?:string;
    brand:string;
    sellerName:string;
  }  