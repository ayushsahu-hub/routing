import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes } from "./users/users.routes";
import { inject } from "@angular/core";

const dummyCanMatch:CanMatchFn = (route,segements)=>{
    const router = inject(Router);
    // we need to return a boolean
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 0.5) {
        return true
    } 
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes :Routes = 
[
    { path:'', component:NoTaskComponent,title:'No task selected' },
    { path:'users/:userId', component:UserTasksComponent,
        children:userRoutes,
        // routeGuards canMatch is latest 
        canMatch:[dummyCanMatch],
        //  we can send static data with the help of routes and this can be retrived in the component with the help of 
        // input parameter
        data:{message:'hello'},
        runGuardsAndResolvers:'always',
        // with the help of resolve parameter we can send dynamic data to the componenets 
        resolve:{
            userName : resolveUserName
        },
        title:resolveTitle
    },
    {path:'**', component:NotFoundComponent}
]