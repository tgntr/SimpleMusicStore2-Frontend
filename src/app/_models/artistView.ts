import { RecordDetails } from './recordDetails';

export class ArtistView {
    name: string;
    id: number;
    image: string;
    records: RecordDetails[];
    isFollowed: boolean;
}