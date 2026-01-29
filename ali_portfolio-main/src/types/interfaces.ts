export interface Props {
  id?: any;
  addid?: any;
  image?: string;
  date?: string;
  title?: string;
  description?: string;
  icon?: any;
  price?: number;
  details?: any[];
  alt?: string;
  author?: string;
  link1?: string;
  link1title?: string;
  link2?: string;
  link2title?: string;
}

export interface CarouselProps {
  images: string[];
  duration?: number;
}

export interface TagType {
  id: number;
  title: string;
}

export interface Country {
  key?: string;
  id: number;
  countryflagurl?: string;
  countrybgurl?: string;
  title: string;
  details?: string;
  tagId?: number;
  overview?: string;
  countryname?: string;
  tag?: TagType;
}

export interface FileProcessingRequirement {
  key: string;
  id: number;
  title: string;
  description: string;
  countryid: number;
}

export interface FileProcessing {
  key?: string;
  id: number;
  title: string;
  countryflagurl?: string;
  countrybgurl?: string;
  overview?: string;
}

export interface TravelItineraryDetails {
  key: string;
  id: number;
  title: string;
  description: string;
  countryid: number;
}

export interface VisaRequirement {
  key: string;
  id: number;
  title: string;
  description: string;
  countryid: number;
}
