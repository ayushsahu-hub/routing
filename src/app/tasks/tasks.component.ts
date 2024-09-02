import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent,RouterLink],
})
export class TasksComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private taskService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  // order = input<'asc' | 'desc'>();
  order = signal<'asc' | 'desc'>('desc');
  userId = input.required<string>();
  userTasks = computed(()=> this.taskService.allTasks()
  .filter(task => task.userId === this.userId())
  .sort((a,b)=>{
     if (this.order()==='desc') {
      return a.id > b.id ? 1 : -1;
     } else {
      return a.id > b.id ? -1 : 1;
     }
  }));
//  computed function will be called when ever the signal value changes in the above case 
// we are using 2 signals hence it will be called on any one signal changes.
  
ngOnInit(): void {
  const subscription = this.activatedRoute.queryParams.subscribe({
    next:params => this.order.set(params['order']),
  });
  this.destroyRef.onDestroy(()=> subscription.unsubscribe());
}
  
}
