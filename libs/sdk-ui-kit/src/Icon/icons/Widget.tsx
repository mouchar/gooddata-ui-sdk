// (C) 2024 GoodData Corporation

import React from "react";
import { IIconProps } from "../typings.js";

/**
 * @internal
 */
export const Widget: React.FC<IIconProps> = ({ color, className, width = 14, height = 14 }) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.25 13.6973H1.05273C0.761068 13.6973 0.512695 13.5947 0.307617 13.3896C0.102539 13.1846 0 12.9385 0 12.6514V1.44727C0 1.16016 0.102539 0.914062 0.307617 0.708984C0.512695 0.503906 0.761068 0.401367 1.05273 0.401367H12.25C12.5417 0.401367 12.79 0.503906 12.9951 0.708984C13.2002 0.914062 13.3027 1.16016 13.3027 1.44727V12.6514C13.3027 12.9385 13.2002 13.1846 12.9951 13.3896C12.79 13.5947 12.5417 13.6973 12.25 13.6973ZM1.05273 1.09863C0.952474 1.09863 0.868164 1.13281 0.799805 1.20117C0.731445 1.26953 0.697266 1.35156 0.697266 1.44727V12.6514C0.697266 12.7471 0.731445 12.8291 0.799805 12.8975C0.868164 12.9658 0.952474 13 1.05273 13H12.25C12.3457 13 12.4277 12.9658 12.4961 12.8975C12.5645 12.8291 12.5986 12.7471 12.5986 12.6514V1.44727C12.5986 1.35156 12.5645 1.26953 12.4961 1.20117C12.4277 1.13281 12.3457 1.09863 12.25 1.09863H1.05273ZM4.55273 11.5986H3.15137C3.05566 11.5986 2.97363 11.5645 2.90527 11.4961C2.83691 11.4277 2.80273 11.3457 2.80273 11.25V4.94727C2.80273 4.85156 2.83691 4.76953 2.90527 4.70117C2.97363 4.63281 3.05566 4.59863 3.15137 4.59863H4.55273C4.64844 4.59863 4.73047 4.63281 4.79883 4.70117C4.86719 4.76953 4.90137 4.85156 4.90137 4.94727V11.25C4.90137 11.3457 4.86719 11.4277 4.79883 11.4961C4.73047 11.5645 4.64844 11.5986 4.55273 11.5986ZM3.5 10.9014H4.19727V5.30273H3.5V10.9014ZM7.34863 11.5986H5.94727C5.85156 11.5986 5.76953 11.5645 5.70117 11.4961C5.63281 11.4277 5.59863 11.3457 5.59863 11.25V2.84863C5.59863 2.75293 5.63281 2.6709 5.70117 2.60254C5.76953 2.53418 5.85156 2.5 5.94727 2.5H7.34863C7.44434 2.5 7.52637 2.53418 7.59473 2.60254C7.66309 2.6709 7.69727 2.75293 7.69727 2.84863V11.25C7.69727 11.3457 7.66309 11.4277 7.59473 11.4961C7.52637 11.5645 7.44434 11.5986 7.34863 11.5986ZM6.30273 10.9014H7V3.19727H6.30273V10.9014ZM10.1514 11.5986H8.75C8.6543 11.5986 8.57227 11.5645 8.50391 11.4961C8.43555 11.4277 8.40137 11.3457 8.40137 11.25V7.75C8.40137 7.6543 8.43555 7.57227 8.50391 7.50391C8.57227 7.43555 8.6543 7.40137 8.75 7.40137H10.1514C10.2471 7.40137 10.3291 7.43555 10.3975 7.50391C10.4658 7.57227 10.5 7.6543 10.5 7.75V11.25C10.5 11.3457 10.4658 11.4277 10.3975 11.4961C10.3291 11.5645 10.2471 11.5986 10.1514 11.5986ZM9.09863 10.9014H9.80273V8.09863H9.09863V10.9014Z"
                fill={color ?? "#94A1AD"}
            />
        </svg>
    );
};
