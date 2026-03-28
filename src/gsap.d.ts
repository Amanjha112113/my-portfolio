declare module 'gsap/SplitText' {
  export class SplitText {
    constructor(target: string | Element | (string | Element)[] | NodeList, vars?: object);
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    revert(): void;
    split(vars: object): void;
  }
}

declare module 'gsap/ScrollSmoother' {
  export class ScrollSmoother {
    static create(vars: object): ScrollSmoother;
    static refresh(value?: boolean): void;
    paused(value: boolean): void;
    scrollTo(target: string | number | Element | null, smooth?: boolean, position?: string): void;
    scrollTop(value?: number): number;
  }
}
