/// <reference types="react" />
declare type Props = {
    barColor?: string;
    fontColor?: string;
    fontSize?: string;
    capacity: number;
    paused?: boolean;
};
export default function FPSStat({ fontColor, fontSize, barColor, capacity, paused }: Props): JSX.Element;
export {};
