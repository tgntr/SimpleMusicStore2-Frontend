import { Component, OnInit, Input } from '@angular/core';
import { TrackDetails } from '../_models/trackDetails';
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  @Input() tracks: TrackDetails[];

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [100];
  msaapDisplayVolumeControls = true;
  msaapPlaylist: Track[] = [];
  constructor() { 
    
  }

  ngOnInit() {
    if (this.tracks) {
    this.tracks.forEach((track, index) => {
      let trackPreview = new Track();
      trackPreview.link = track.preview;
      trackPreview.title = `${index + 1}. ${track.title}`;
      this.msaapPlaylist.push(trackPreview);
    });
    }
  }

}
