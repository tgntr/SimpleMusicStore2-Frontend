import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseComponent implements OnDestroy {
    unsubscribe = new Subject<void>();
  
    ngOnDestroy(): void {
        debugger;
        console.log(this.unsubscribe);
      this.unsubscribe.next();
      this.unsubscribe.complete();
    }
  
  }