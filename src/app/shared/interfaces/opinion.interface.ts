import { IAuthor } from './authors.interface';

export interface IOpinion {
  id?: string;
  title?: string;
  description?: string;
  richDescription?: string;
  author?: IAuthor;
  numReviews?: number;
  coverImage?: string;
  createdAt?: Date;
}
