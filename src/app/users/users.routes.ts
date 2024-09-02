import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";

export const routes:Routes = [
    // if the user navigates manually to users/:userId then we should redirect them to /tasks
    {path:'',redirectTo:'tasks',pathMatch:'full'},
    {path:'tasks',component:TasksComponent},
    {path:'tasks/new',component:NewTaskComponent, canDeactivate:[canLeaveEditPage]}
]