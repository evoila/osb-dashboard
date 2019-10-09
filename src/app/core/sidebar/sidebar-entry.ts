export type SidebarLink = SidebarLinkWithClick | SidebarLinkWithHref;

export interface SidebarLinkProperties {
  name: string;
  iconClass?: string;
  class?: string;
  isActiveLink?: boolean;
  button?: boolean;
  buttonFavicon?: string,
  buttonActionListener?: Function
}

export interface SidebarLinkWithHref extends SidebarLinkProperties {
  href: string | any[];
}

export interface SidebarLinkWithClick extends SidebarLinkProperties {
  onClicked: () => void;
}

export interface SidebarEntry {
  name: string;
  isSeparator?: boolean;
  isCollapsible: boolean;
  isDisabled?: boolean;
  links: SidebarLink[];
  button?: boolean;
  buttonFavicon?: string,
  buttonActionListener?: Function
}

