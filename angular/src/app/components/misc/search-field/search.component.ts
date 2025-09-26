import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowSmallUpMini } from '@ng-icons/heroicons/mini';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { heroAdjustmentsHorizontalSolid, heroMagnifyingGlassSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'search-field',
  standalone: true,
  imports: [
    NgIconComponent
  ],
  providers: [
    provideIcons({
      heroMagnifyingGlassSolid,
      heroAdjustmentsHorizontalSolid,
      heroArrowSmallUpMini,
      heroAdjustmentsHorizontal
    })
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

}
