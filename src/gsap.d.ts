declare module 'gsap-trial/SplitText' {
  export class SplitText {
    constructor(target: string | Element | Element[] | NodeList, vars?: object);
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    revert(): void;
    split(vars: object): void;
  }
}

declare module 'gsap-trial/ScrollSmoother' {
  export class ScrollSmoother {
    static create(vars: object): ScrollSmoother;
    paused(value: boolean): void;
    scrollTo(target: string | number | Element, smooth?: boolean, position?: string): void;
    scrollTop(): number;
  }
}
