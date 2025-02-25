export type TCar = {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
  status: 'available' | 'unavailable';
};
