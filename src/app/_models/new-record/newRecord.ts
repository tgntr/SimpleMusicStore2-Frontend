import { RecordVideoInfo } from './recordVideoInfo';
import { LabelInfo } from './labelInfo';
import { ArtistInfo } from './artistInfo';
import { ImageInfo } from './imageInfo';
import { RecordTrackInfo } from './recordTrackInfo';
import { RecordFormatInfo } from './recordFormatInfo';

export class NewRecord {
    id: number;
    title: string;
    year: number;
    price: number;
    quantity: number;
    videos: RecordVideoInfo[];
    label: LabelInfo;
    artist: ArtistInfo;
    images: ImageInfo[];
    genres: string[];
    tracklist: RecordTrackInfo[];
    formats: RecordFormatInfo[];
}