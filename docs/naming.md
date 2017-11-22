This document lists how we name files, classes, and angular selectors

# File Names
File names should be **lower-dash-case** (As in "`some-filename.ts`"),
so we don't have to worry about case-sensitivity.

Files should also have their angular type appended to the name.
A component should be `some-component.component.ts`,
while a service should be named `some-service.service.ts`.

### Referencing files
Files are usually referenced without their extention.
Notice that there is no `.ts` in `./app.component`.

Example:
`import { AppComponent }   from './app.component';`

_Note: our filenameing convenions could change in the future_

# Class names and Selectors
By convention, class names use **UpperCammelCase**, 
while selectors are **lower-dash-case** (to match html conventions)

Angular Type should be appended to class names
(all component's should end with `Component`)

### Example
`AppComponent` is a class in the following snipet. 
Notice how words are separarated with capitalization. 
`my-app` is a selector. Notice how it is not capitalized.
```
@Component({
  selector: 'my-app',
  template: '<h1>Thing</h1>'
})
export class AppComponent { }
```
