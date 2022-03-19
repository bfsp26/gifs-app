import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ['']
})
export class SidebarComponent {

  get record() {
    return this.gifService.record;
  }

  constructor(private gifService: GifsService) { }

  search(lastSearch: string) {
    this.gifService.searchGifs(lastSearch);
  }

}
