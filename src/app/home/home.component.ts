import {
  Component,
  OnInit,
  style,
  animate,
  transition,
  trigger
} from '@angular/core';

// types
import { Topic } from '../shared/types';

// service
import { TopicsService } from '../shared/topics.service';

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
  sortType: string;
  sortDirection: boolean;

  constructor(
    private topicsService: TopicsService
  ) {
    this.detailsAreShown = false;
    this.sortType = '';
    this.sortDirection = true;
  }

  getTopics(): void {
    // subscribe to the observable
    this.topicsService.reddit$.subscribe(topics => this.topics$ = topics);
  }

  showDetails(topic): void {
    this.activeTopic = topic;
  }

  sort(type: string, direction: boolean): void {
    this.sortType = type;
    this.sortDirection = direction;
  }

  ngOnInit() {
    this.getTopics();
  }

}
