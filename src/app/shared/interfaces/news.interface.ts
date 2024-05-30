import { IAuthor } from './authors.interface';
import { ICategory } from './category.intertface';

export interface INews {
  id: string;
  title: string;
  description: string;
  richDescription: string;
  image?: string;
  author: IAuthor;
  category: ICategory;
  isFeatured: boolean;
  numReviews: number;
  isBreakingNews: boolean;
  coverImage?: string;
  createdAt: Date;
}
