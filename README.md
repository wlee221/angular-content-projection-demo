# LLBC 12/03 -- Angular "Slots"

## I. Web Components Slot overview

## II. Angular content projection

#### (step 1) `<ng-content>`
`ng-content` renders any `children` passed to this component.
see: https://github.com/wlee221/angular-content-projection-demo/compare/step-1
#### (step 2) `<ng-content select=".myclass"`>
`ng-content` accepts `select`. Only elements that matches given CSS selector will be rendered.

see: https://github.com/wlee221/angular-content-projection-demo/compare/step-1...step-2

#### (step 3) `<ng-template>` and `[ngTemplateOutlet]`

`ng-content` has few limitations:
- `ng-content` is HTML only, and cannot be controlled programatically
- You cannot pass data from parent to child
- It's hard to add default/fallback content.


`ng-template` defines a template that is not rendered by default. This is only rendered when you specifically instruct it to do so.

```html
<ng-template #myTemplate>
  I'll be rendered later!
</ng-template>
```

`[ngTemplateOutlet]` is one way to do so. On any container, you can set `[ngTemplateOutlet]` to content template onto any element. 
 
```html
  <ng-container [ngTemplateOutlet]="myTemplate"></ng-container>
```

To query multiple tempalte variables, you can leverage attribute directives.

Attribute directive allows you to declrea reusable attributes, just like HTML attributes, that can change the appearance and behavior of DOM elements.

In our use case, we will create `app-slot` directives to mark and collect all children that has it defined.

```html
<app-authenticator>
  <!-- Will be inserted into authenticator's footer content  -->
  <div app-slot="footer">Custom footer</div> 
</app-authenticator>
```

Then the parent component can collect elements with `@ContentChildren` that has the directives set.

See:  https://github.com/wlee221/angular-content-projection-demo/compare/step-2...step-3
      https://angular.io/api/core/ng-template
      https://angular.io/api/core/ContentChildren
      https://angular.io/guide/attribute-directives

#### (step 4) `[ngTemplateContextOutlet]`

Parent component can provide any useful `context` to the child component.

```ts
  get context() {
    return {
      /** Any useful context here*/
    };
  }
```

```html
  <ng-container
    [ngTemplateOutlet]="customComponents?.authenticated || null"
    [ngTemplateOutletContext]="context"
  ></ng-container>
```

See: https://github.com/wlee221/angular-content-projection-demo/compare/step-3...step-4

#### (step 5) Default content

    Because `ngTemplateOutlet` can accept JS epxressions to decide what to render, we can use it to have a fallback component if child component doesn't pass any slots.

```html
  <ng-template #defaultAuthenticated>
    Some default content...
  </ng-template>

  <ng-container
    [ngTemplateOutlet]="customComponents?.authenticated || defaultAuthenticated"
    [ngTemplateOutletContext]="context"
  ></ng-container>
```

See: https://github.com/wlee221/angular-content-projection-demo/compare/step-4...step-5

(step 6) Reusable `<app-slot>` component

Notice a big DX pain in writing those default contents. Web component / Vue slots allows library writers to put default content and slot name in place:

```
<slot name="authenticated>
  Some default content...
</slot>
```

Let's recreate this in Angular, using both `ng-content` and `ng-template`.

See: https://github.com/wlee221/angular-content-projection-demo/compare/step-5...step-6
