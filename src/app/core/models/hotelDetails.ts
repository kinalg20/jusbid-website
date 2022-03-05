export interface HotelDetails {
    city: string;
    hotel_id: string;
}

// import {Amenity} from './amenity';

// export interface HotelImage {
//     createdAt: Date;
//     updatedAt: Date;
//     id: string;
//     hotel_id: string;
//     name: string;
//     path: string;
//     min_path: string;
//     is_active: boolean;
// }

// export interface RecommendedHotel {
//     id: string;
//     name: string;
//     image: string;
//     rating: string;
//     city: string;
//     status: string;
//     room_price: number;
// }

// export interface HotelOtherInfo {
//     createdAt: Date;
//     updatedAt: Date;
//     id: string;
//     hotel_id: string;
//     type: string;
//     content: string;
// }

// export interface RoomImage {
//     createdAt: Date;
//     updatedAt: Date;
//     id: string;
//     hotel_id: string;
//     room_id: string;
//     name: string;
//     path: string;
//     min_path: string;
//     is_active: boolean;
// }

// export interface HotelRoom {
//     createdAt: Date;
//     updatedAt: Date;
//     id: string;
//     hotel_id: string;
//     room_views: string[];
//     image: string;
//     min_path: string;
//     room_type: string;
//     room_amenities: string[];
//     price: number;
//     capacity: number;
//     size: string;
//     description: string;
//     bed_size: string;
//     quantity: number;
//     is_active: boolean;
//     room_images: RoomImage[];
// }

// export interface RatingsData {
//     value: number;
//     clean: number;
//     location: number;
//     service: number;
//     totalRatings: number;
// }

// export interface HotelDetails {
//     createdAt: Date;
//     updatedAt: Date;
//     id: string;
//     bdeId: string;
//     hotelierId: string;
//     name: string;
//     view_name: string;
//     description: string;
//     category: string;
//     star_rating: string;
//     image: string;
//     threesixty_view: string;
//     rating: string;
//     hotel_amenities: string[];
//     hotel_views: string[];
//     seasonal_months: string[];
//     downfall: number;
//     commission: number;
//     latitude: string;
//     longitude: string;
//     plot_no: string;
//     street: string;
//     area: string;
//     address: string;
//     landmark: string;
//     city: string;
//     state: string;
//     zip: number;
//     country: string;
//     occupancy: string;
//     landline: string;
//     mobile: string;
//     email: string;
//     owner_name: string;
//     owner_mobile: string;
//     owner_email: string;
//     manager_name: string;
//     manager_mobile: string;
//     manager_email: string;
//     exec_name: string;
//     exec_mobile: string;
//     exec_email: string;
//     fax: string;
//     status: string;
//     statusNote: string;
//     is_deleted: boolean;
//     hotel_images: HotelImage[];
//     HotelOtherInfo: HotelOtherInfo[];
//     FAQ: any[];
//     Amenities: Amenity[];
//     hotel_rooms: HotelRoom[];
//     recommended_hotels: RecommendedHotel[];
//     Feedback: any[];
//     RatingsData: RatingsData;
// }