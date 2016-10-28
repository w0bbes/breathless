import { 
  Component, 
  OnInit, 
  style, 
  state, 
  animate, 
  transition, 
  trigger 
} from '@angular/core';

// types
import { Reddit, Topic } from '../shared/types';

// service
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger(
      'slideIn', 
      [
        transition(
          'void => *', [
            style({ transform: 'translateX(100%)' }),
            animate(200)
          ]
        ),
        transition(
         '* => void', [
           style({ transform: 'translateX(0%)' }),
           animate(100)
         ] 
        )
      ]
    )
  ]
})

export class HomeComponent implements OnInit {

  topics$: Array<Topic>;
  detailsAreShown: boolean;
  activeTopic: Topic;

  constructor(
    private apiService: ApiService
  ) {
    this.detailsAreShown = false;
  }

  /**
   * getTopics returns the reddit data in a streaming observable
   */
  getTopics(): void {
    // subscribe to the store observable
    this.apiService.reddit$.subscribe(topics => this.topics$ = topics);
  }

  showDetails(topic): void {
    this.activeTopic = topic;
  }

  ngOnInit() {
    this.getTopics();
  }

}
