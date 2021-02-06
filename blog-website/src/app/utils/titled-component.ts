import { Observable } from 'rxjs';

export interface TitledComponent {
  getTitleForComponent(): string | Observable<string>;
}

export function componentIsTitledComponent(component: unknown): component is TitledComponent {
  return typeof component === 'object' 
         && component !== null 
         && 'getTitleForComponent' in component 
         && typeof (component as TitledComponent).getTitleForComponent === 'function';
}
