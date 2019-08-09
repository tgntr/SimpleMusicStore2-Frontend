import { ArtistDetails } from './artistDetails';
import { LabelDetails } from './labelDetails';
import { TrackDetails } from './trackDetails';

export class RecordView {
    title: string;
    image: string;
    genre: string;
    year: number;
    tracklist: TrackDetails[];
    artist: ArtistDetails;
    label: LabelDetails;
    price: number;
    format: string;
    isInWishlist: boolean;
}