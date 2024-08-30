import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports:[RouterOutlet,RouterLink]
})
export class UserTasksComponent implements OnInit{
  private destroyRef = inject(DestroyRef)
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  userId = input.required<string>(); // this will give a signal using input in this way

  userName = computed(()=> this.usersService.users.find(u=> u.id === this.userId())?.name);

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => console.log(paramMap.get('userId'))
    });
    // this is also a method of getting route params
   this.destroyRef.onDestroy(()=> subscription.unsubscribe());
  }

}
