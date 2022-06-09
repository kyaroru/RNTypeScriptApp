export type FontSize = 'xxxl' | 'xxl' | 'xl' | 'l' | 'ml' | 'm' | 's' | 'xs' | 'xxs';
export type FontVariant = 'light' | 'regular' | 'bold';

export interface IconProps {
  id: number;
  icon: string;
  label: string;
  color: string;
};

export interface DummyFeaturedItem {
  id: number;
  image: string;
  price?: string;
  originalPrice?: string;
  rank?: string;
  sold?: string;
  category?: string;
}

export interface DummyCartItem {
  title: string;
  image: string;
  price: number;
};

export interface Rating {
  rate?: number;
  count?: number;
};
