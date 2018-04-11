# MDC Bottom Navigation

The MDC Bottom Navigation component contains components which are used to create spec-aligned tabbed navigation components adhering to the
[Material Design bottom navigation guidelines](https://material.io/guidelines/components/bottom-navigation.html). These components are:

- **mdc-bottom-navigation-action**: The individual action elements
- **mdc-bottom-navigation**: The main component which is composed of `mdc-bottom-navigation-action` elements

## Design & API Documentation

// TODO

## Installation

```
npm install @material/bottom-navigation
```

## Bottom navigation usage

`mdc-bottom-navigation` can be used as a CSS only component, or a more dynamic JavaScript component.

There are also [two different bar styles](https://material.io/guidelines/components/bottom-navigation.html#bottom-navigation-specs).
These include fixed bar or shifting bar. An example of each is available on the demo site.

#### Fixed Bottom Navigation
```html
<nav class="mdc-bottom-navigation mdc-bottom-navigation--fixed">
    <ul class="mdc-bottom-navigation__actions">
        <li class="mdc-bottom-navigation__action mdc-bottom-navigation__action--active">
            <a href="#action-1">
                <i class="material-icons mdc-bottom-navigation__icon" aria-hidden="true">
                    broken_image
                </i>
            
                <span class="mdc-bottom-navigation__label">
                    Action 1
                </span>
            </a>
        </li>
        
        <li class="mdc-bottom-navigation__action">
            <a href="#action-2">
                <i class="material-icons mdc-bottom-navigation__icon" aria-hidden="true">
                    broken_image
                </i>
            
                <span class="mdc-bottom-navigation__label">
                    Action 2
                </span>
            </a>
        </li>
        
        <li class="mdc-bottom-navigation__action">
            <a href="#action-3">
                <i class="material-icons mdc-bottom-navigation__icon" aria-hidden="true">
                    broken_image
                </i>
            
                <span class="mdc-bottom-navigation__label">
                    Action 3
                </span>
            </a>
        </li>
    </ul>
</nav>
```

#### Shifting Bottom Navigation
```html
<nav class="mdc-bottom-navigation mdc-bottom-navigation--shifting">
    <ul class="mdc-bottom-navigation__actions">
        <li class="mdc-bottom-navigation__action mdc-bottom-navigation__action--active">
            <a href="#action-1">
                <i class="material-icons mdc-bottom-navigation__icon" aria-hidden="true">
                    broken_image
                </i>
            
                <span class="mdc-bottom-navigation__label">
                    Action 1
                </span>
            </a>
        </li>
        
        <li class="mdc-bottom-navigation__action">
            <a href="#action-2">
                <i class="material-icons mdc-bottom-navigation__icon" aria-hidden="true">
                    broken_image
                </i>
            
                <span class="mdc-bottom-navigation__label">
                    Action 2
                </span>
            </a>
        </li>
        
        <li class="mdc-bottom-navigation__action">
            <a href="#action-3">
                <i class="material-icons mdc-bottom-navigation__icon" aria-hidden="true">
                    broken_image
                </i>
            
                <span class="mdc-bottom-navigation__label">
                    Action 3
                </span>
            </a>
        </li>
    </ul>
</nav>
```
