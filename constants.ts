
import { UserConfig } from './types';

/**
 * EDIT THIS FILE TO UPDATE PINS AND DRIVE LINKS
 * All images must be placed in the /PICS folder and named [id].jpg
 */

export interface UserVault extends UserConfig {
  tagline: string;
}

export const USERS_DATA: UserVault[] = [
  {
    id: 'sravanth',
    name: 'Sravanth',
    username: 'sravanth_user',
    password: '1234',
    driveLink: 'https://drive.google.com/drive/folders/1x-9fbrZuhmXBAdVAIoxjc_LYYScHWd4r?usp=drive_link',
    imageUrl: './PICS/sravanth.jpg',
    role: 'user',
    tagline: 'Recent Trip Pics'
  },
  {
    id: 'madhu',
    name: 'Madhu',
    username: 'madhu_user',
    password: '0808',
    driveLink: 'https://drive.google.com/drive/folders/1DyBH7j4Xy0XkRCkt25VZcRMW7ow4O0A3?usp=drive_link',
    imageUrl: './PICS/madhu.jpg',
    role: 'user',
    tagline: 'TTD Pilgrimage Pics'
  },
  {
    id: 'aditya',
    name: 'Aditya',
    username: 'aditya_user',
    password: '0007',
    driveLink: 'https://drive.google.com/drive/folders/1lAVWxDTdmaeXlwdKH4_v4sohY3D8pP9T?usp=sharing',
    imageUrl: './PICS/aditya.jpg',
    role: 'user',
    tagline: 'Caves Exploration'
  },
  {
    id: 'girish',
    name: 'Girish',
    username: 'girish_user',
    password: '1238',
    driveLink: 'https://drive.google.com/drive/folders/1p4BJ4TpKvxbH8lZytoMZHO-tzumQKxQ9?usp=drive_link',
    imageUrl: './PICS/girish.jpg',
    role: 'user',
    tagline: 'Recent Trip Memories'
  },
  {
    id: 'shanmuk',
    name: 'Shanmuk',
    username: 'shanmuk_user',
    password: '9595',
    
    driveLink: 'https://drive.google.com/drive/folders/1QmMDlxHFphwNQZATSy1J1d6xw0vUNI6G?usp=drive_link',
    imageUrl: './PICS/shanmuk.jpg',
    role: 'user',
    tagline: 'Vault login required'
  },
  {
    id: 'soma',
    name: 'Soma',
    username: 'soma_user',
    password: '9229',
    driveLink: 'https://drive.google.com/drive/folders/1gAjAalYD-4lu-3ZByO7jBtJoyVz_nfIb?usp=drive_link',
    imageUrl: './PICS/soma.jpg',
    role: 'user',
    tagline: 'High-res CAVES pics'
  },
  {
    id: 'vignesh',
    name: 'Vignesh',
    username: 'vignesh_user',
    password: '1132',
    driveLink: 'https://drive.google.com/drive/folders/1gAjAalYD-4lu-3ZByO7jBtJoyVz_nfIb?usp=drive_link',
    imageUrl: './PICS/vignesh.jpg',
    role: 'user',
    tagline: 'Login to access photos'
  },
  {
    id: 'admin',
    name: 'Admin',
    username: 'admin_root',
    password: '5413',
    driveLink: 'https://drive.google.com/drive/folders/18y6x09iw_06-8f7c6L7P_CVS-yanuUJr?usp=drive_link',
    imageUrl: './PICS/admin.jpg',
    role: 'admin',
    tagline: 'Root Registry Access'
  },
  {
    id: 'bharath',
    name: 'Prabhas',
    username: 'bharath_user',
    password: '3344',
    driveLink: 'https://drive.google.com/drive/folders/bharath_sample_id',
    imageUrl: './PICS/bharath.jpg',
    role: 'user',
    tagline: 'New Vault Entry'
  },
  {
    id: 'naresh',
    name: 'Santhosh',
    username: 'naresh_user',
    password: '0419',
    driveLink: 'https://drive.google.com/drive/folders/naresh_sample_id',
    imageUrl: './PICS/naresh.jpg',
    role: 'user',
    tagline: 'Awaiting Sync'
  }
  
];
