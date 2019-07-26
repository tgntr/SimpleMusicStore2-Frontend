import { LabelDetails } from './labelDetails';
import { ArtistDetails } from './artistDetails';

export class RecordDetails {
    id: number;
    title: string;
    image: string;
    year: number;
    label: LabelDetails;
    artist: ArtistDetails;
    price: number;
    //popularity: number;
    //dateAdded: Date;
}