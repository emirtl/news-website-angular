import { ILiveUpdateItem } from './liveUpdateItems.interface';

export interface ILiveUpdate {
  id: string;
  coverTitle: string;
  mainCoverImage: string;
  liveUpdateItems: [ILiveUpdateItem];
}
