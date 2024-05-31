export enum ButtonTypes {
  Primery = "primery-button",
  ButtonWithIcon = "Button_with_left_icon",
  Disabled = "disabled_button",
  WithoutBg = "Without_background",
}

export interface ILanguages {
  id: number;
  icon: string;
  code: string;
}

export interface IActionCard {
  src: string,
  title: string,
  onClick: () => void
}

export interface IAutocompleteItem {
  id: string,
  title: string
}

export type IAutocompleteData = IAutocompleteItem[];

export enum TableCellTypes {
  HEADER = "header",
  ITEM = "item"
}
