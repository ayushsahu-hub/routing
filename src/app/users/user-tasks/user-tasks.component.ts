import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports:[RouterOutlet,RouterLink]
})
export class UserTasksComponent {
  // private destroyRef = inject(DestroyRef);
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  userId = input.required<string>(); // this will give a signal using input in this way
  message = input<string>();
  userName = input.required<string>();
  // userName = computed(()=> this.usersService.users.find(u=> u.id === this.userId())?.name);

  // this complete ngoninit is not at all required now we can access username input with the help 

  // ngOnInit(): void {
  //   // this will give static data, we can us this approach when the there is static route to that
  //   // page, in this page we can't use this since userId keeps on changing.
  //   console.log(this.activatedRoute.snapshot);
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => console.log(paramMap.get('userId'))
  //   });
  //   // this is also a method of getting route params
  //  this.destroyRef.onDestroy(()=> subscription.unsubscribe());
  // }

}

// this function will executed all the time whenever a new user is loaded, therefore no need to subscribe
export const resolveUserName:ResolveFn<string | undefined> = (activatedRoute:ActivatedRouteSnapshot,routerState:RouterStateSnapshot)=> {
  const usersService = inject(UsersService);
  const userName = usersService.users.find(u=> u.id === activatedRoute.paramMap.get('userId'))?.name;
  return userName;
}

export const resolveTitle:ResolveFn<string> = (activatedRoute,routerState)=>{
  return resolveUserName(activatedRoute,routerState) + '\'s tasks';
}
