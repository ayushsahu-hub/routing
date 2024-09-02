import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers:[provideRouter(routes,withComponentInputBinding(),withRouterConfig({
        paramsInheritanceStrategy:'always'
    }))]

    // with the use of paramsInheritanceStrategy we can get access to the dynamic parameter of the 
    // parent route in the children route
}