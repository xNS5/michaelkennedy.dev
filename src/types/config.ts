export type Config = {
  [key: string]: {
    name: string;
    aria_announcement?:string;
    title?: string;
    description?: string;
    text?: Text[];
    pages: {
      resume: Resume,
      home: Home
    }
    robots?: {
      [key: string]: {
        [key: string]: string[] | string
      }
    }
  }
};


export interface Page {
  title: string;
}

export interface Home extends Page {
  sections: SectionType[]
}

export interface Resume extends Page {
  [key: string]: string
}
  
  export type Text = {
    title: string,
    text: string
  }

export type SectionType = {
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