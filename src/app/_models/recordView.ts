import { ArtistDetails } from './artistDetails';
import { LabelDetails } from './labelDetails';
import { TrackDetails } from './trackDetails';
import { CommentView } from './comment-view';

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
    comments: CommentView[];
}