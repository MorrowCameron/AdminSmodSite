export interface IAPIImageData {
  id: string;
  src: string;
  name: string;
  alt?: string;
}

export interface IAPITextData {
  id: string;
  name: string;
  value: string;
}

export interface IAPIMemberData {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  src: string;
  alt?: string;
}

export interface IAPIAlumniData {
  id: string;
  first_name: string;
  last_name: string;
}

export interface IAPIContactData {
  id: string;
  name: string;
  link: string;
}