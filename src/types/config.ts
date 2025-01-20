import {FooterItem} from "@/types/footer";

export interface Page {
  title: string;
}

export interface Home extends Page {
  sections: Section[]
}

export interface Resume extends Page {
  [key: string]: string
}


export type Config = {
  resume: Resume,
  home: Home,
  footer: FooterItem[],
  metadata: Metadata,
  [key: symbol]: {
    title: string;
    description?: string;
    text?: Text[];
    robots?: {
      [key: string]: {
        [key: string]: string[] | string
      }
    },
  }
};

type Metadata = {
  robots: {
    rules: RobotRules[],
    [key: symbol]: string
  }
  title: string,
  description: string
}

type RobotRules = {
  "userAgent": string[],
  allow?: string,
  disallow?: string
}
  
type Text = {
    title: string,
    text: string
  }

type Section = {
  image?: string,
  title: string,
  text: string,
  links: Link[]
}

export type Link = {
  title: string,
  url: string,
  icon?: string,
  type?: string,
  color?: string,
  target?: string,
  children?: Link[],
  className?: string
  alt?: string
}