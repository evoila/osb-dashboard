
export interface OptionDomainViewModel {
    /* Interface taht defines the way data has to be given into this component
     * The Component builds the navigation from it
     * Every main Attribute is immediatly visible actions are translatet in
     * subnavigation Items.
     */

    name: string;
    // Font Awesome Icon Class
    iconClass?: string;
    actions: Array<FormActionViewModel>;
}
export interface ActionViewModel {
    /*  the action ViewModel is responsible for the Subnavigation Items
     *  each of these Items is a Closure at heart. They transform the option-state
     *  this transformation is achived via a ngrx action tht is dispatched
     *  there has to be an effect that is responsible for each and every state mutation
     */

    name: string;
    Action: { new(...arg: any) };
    payload: any;
    // Font Awesome Icon Class
    iconClass: string;
}
export interface FormActionViewModel {
    name: string
    type?: FormType
    Action?: { new(...arg: any) };
    payload?: any
    iconClass?: string;
    options?: Array<FormActionViewModel>
}


export interface FormType {
    type: string
}
export class TextFieldType implements FormType {
    readonly type = 'text'
}
export class SelectFieldType implements FormType {
    readonly type = 'select'
}
export type FromTypes = TextFieldType | SelectFieldType;