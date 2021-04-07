export interface ProductModel {
    productId?: string;
    createdAt?: string;
    updatedAt?: string;
    name: string;
    desc: string;
    price?: number;
    imageUrls?: string[];
    defaultImage?: string;
    file?: any;
    fileSource?: any;
}
