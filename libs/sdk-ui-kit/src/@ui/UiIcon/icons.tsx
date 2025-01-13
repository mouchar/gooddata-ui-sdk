// (C) 2024-2025 GoodData Corporation
import React from "react";
import { e } from "./iconBem.js";
import { IconType } from "../@types/icon.js";

export interface IIconConfig {
    content: React.ReactNode;
    viewBox: string;
}

export const iconsConfig: Record<IconType, IIconConfig> = {
    check: {
        content: (
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.9345 0.840899C13.0545 0.735955 13.201 0.676239 13.3645 0.676239C13.5293 0.676239 13.682 0.730969 13.8076 0.840899L13.8224 0.85385L13.8354 0.86865C13.9453 0.994284 14 1.14696 14 1.31173C14 1.47638 13.939 1.62589 13.8219 1.74295L4.4323 11.1326C4.37329 11.1916 4.30435 11.2391 4.22621 11.272C4.14912 11.3083 4.06796 11.3238 3.98798 11.3238C3.90399 11.3238 3.82326 11.3068 3.74746 11.2765C3.66486 11.2434 3.59228 11.1943 3.53056 11.1326L0.178058 7.78008C0.0552299 7.65725 -1.52588e-05 7.50051 -1.52588e-05 7.33576C-1.52588e-05 7.17102 0.0552299 7.01427 0.178058 6.89144C0.295305 6.7742 0.446303 6.70027 0.622378 6.70027C0.799114 6.70027 0.956392 6.76804 1.07979 6.89144L3.98783 9.79948L12.9271 0.847437L12.9345 0.840899Z"
                className={e("fill")}
            />
        ),
        viewBox: "0 0 14 12",
    },
    plus: {
        content: (
            <path
                d="M11.0859 5.36719C11.263 5.36719 11.4089 5.42969 11.5234 5.55469C11.6484 5.66927 11.7109 5.8151 11.7109 5.99219C11.7109 6.16927 11.6484 6.32031 11.5234 6.44531C11.4089 6.57031 11.263 6.63281 11.0859 6.63281H6.63281V11.0703C6.63281 11.2474 6.57031 11.3984 6.44531 11.5234C6.33073 11.6484 6.1849 11.7109 6.00781 11.7109C5.83073 11.7109 5.67969 11.6484 5.55469 11.5234C5.42969 11.3984 5.36719 11.2474 5.36719 11.0703V6.63281H0.929688C0.752604 6.63281 0.601562 6.57031 0.476562 6.44531C0.351562 6.32031 0.289062 6.16927 0.289062 5.99219C0.289062 5.8151 0.351562 5.66927 0.476562 5.55469C0.601562 5.42969 0.752604 5.36719 0.929688 5.36719H5.36719V0.914062C5.36719 0.736979 5.42969 0.591146 5.55469 0.476562C5.67969 0.351562 5.83073 0.289062 6.00781 0.289062C6.1849 0.289062 6.33073 0.351562 6.44531 0.476562C6.57031 0.591146 6.63281 0.736979 6.63281 0.914062V5.36719H11.0859Z"
                className={e("fill")}
            />
        ),
        viewBox: "0 0 12 12",
    },
    sync: {
        content: (
            <path
                d="M7.98 13.384C7.55 13.384 7.12 13.344 6.71 13.264C6.3 13.184 5.91 13.064 5.52 12.904C5.14 12.744 4.77 12.554 4.42 12.324C4.07 12.084 3.75 11.814 3.45 11.504C3.16 11.214 2.89 10.904 2.67 10.574C2.44 10.234 2.25 9.88403 2.09 9.52403C1.93 9.15403 1.81 8.76403 1.72 8.36403C1.66 8.06403 1.62 7.74403 1.6 7.43403L0.900004 8.13403C0.900004 8.13403 0.790004 8.22403 0.730004 8.24403C0.600004 8.29403 0.450004 8.29403 0.330004 8.24403C0.260004 8.21403 0.210004 8.17403 0.170004 8.12403C0.0700043 8.02403 0.0200043 7.90403 0.0200043 7.76403C0.0200043 7.62403 0.0700043 7.50403 0.170004 7.39403L1.73 5.82403C1.94 5.61403 2.29 5.62403 2.47 5.82403L4.04 7.39403C4.14 7.49403 4.19 7.61403 4.19 7.75403C4.19 7.89403 4.14 8.01403 4.04 8.11403C3.83 8.31403 3.51 8.31403 3.31 8.11403L2.65 7.45403C2.7 8.05403 2.85 8.62403 3.09 9.16403C3.38 9.78403 3.77 10.334 4.26 10.814C4.74 11.274 5.31 11.644 5.94 11.924C6.58 12.184 7.27 12.324 8 12.324C8.49 12.324 8.97 12.254 9.43 12.124C9.9 11.994 10.35 11.804 10.75 11.554C11.17 11.304 11.54 11.004 11.87 10.654C12.21 10.304 12.5 9.90403 12.72 9.46403C12.8 9.33403 12.9 9.25403 13.03 9.21403C13.17 9.17403 13.31 9.18403 13.43 9.25403C13.56 9.32403 13.64 9.42403 13.68 9.56403C13.72 9.70403 13.7 9.83403 13.64 9.94403C13.37 10.474 13.02 10.954 12.62 11.384C12.23 11.804 11.78 12.154 11.29 12.454C10.8 12.744 10.28 12.964 9.72 13.124C9.17 13.284 8.59 13.364 8 13.364L7.98 13.384ZM13.86 8.29403C13.8 8.29403 13.73 8.28403 13.67 8.25403C13.6 8.22403 13.55 8.18403 13.5 8.14403L11.93 6.57403C11.83 6.47403 11.78 6.35403 11.78 6.21403C11.78 6.07403 11.83 5.95403 11.93 5.84403C12.13 5.64403 12.45 5.64403 12.66 5.84403L13.33 6.51403C13.27 5.91403 13.12 5.34403 12.87 4.81403C12.59 4.18403 12.2 3.62403 11.72 3.16403C11.24 2.69403 10.67 2.31403 10.03 2.05403C9.4 1.78403 8.71 1.64403 8 1.64403C7.51 1.64403 7.03 1.71403 6.57 1.84403C6.11 1.96403 5.67 2.15403 5.26 2.39403C4.85 2.64403 4.47 2.94403 4.14 3.29403C3.81 3.63403 3.52 4.02403 3.29 4.44403C3.23 4.56403 3.13 4.65403 2.99 4.70403C2.84 4.74403 2.71 4.72403 2.58 4.65403C2.47 4.59403 2.38 4.49403 2.34 4.35403C2.3 4.20403 2.31 4.07403 2.38 3.96403C2.67 3.44403 3.01 2.97403 3.4 2.57403C3.8 2.16403 4.25 1.80403 4.73 1.52403C5.21 1.22403 5.74 1.00403 6.29 0.85403C7.23 0.58403 8.29 0.53403 9.26 0.75403C9.67 0.83403 10.07 0.95403 10.45 1.11403C10.83 1.27403 11.2 1.47403 11.55 1.70403C11.9 1.92403 12.23 2.19403 12.53 2.49403C12.83 2.78403 13.09 3.10403 13.32 3.44403C13.55 3.77403 13.74 4.13403 13.9 4.49403C14.06 4.85403 14.18 5.24403 14.27 5.65403C14.34 5.95403 14.38 6.26403 14.4 6.57403L15.1 5.87403C15.28 5.67403 15.63 5.67403 15.83 5.87403C15.93 5.97403 15.98 6.09403 15.98 6.23403C15.98 6.37403 15.93 6.49403 15.83 6.59403L14.26 8.16403C14.26 8.16403 14.15 8.25403 14.09 8.27403C14.03 8.30403 13.96 8.31403 13.9 8.31403L13.86 8.29403Z"
                className={e("fill")}
            />
        ),
        viewBox: "0 0 16 14",
    },
    alert: {
        content: (
            <path
                d="M10.7578 10.2725C10.8216 10.318 10.8626 10.3773 10.8809 10.4502C10.9036 10.5186 10.9036 10.5892 10.8809 10.6621C10.8581 10.735 10.8148 10.7943 10.751 10.8398C10.6917 10.8809 10.6257 10.9014 10.5527 10.9014H7.36719C7.3763 10.9561 7.38314 11.013 7.3877 11.0723C7.39681 11.1315 7.40137 11.1908 7.40137 11.25C7.40137 11.4915 7.35579 11.7194 7.26465 11.9336C7.1735 12.1432 7.04818 12.3278 6.88867 12.4873C6.72917 12.6468 6.54232 12.7721 6.32812 12.8633C6.11849 12.9544 5.8929 13 5.65137 13C5.40983 13 5.18197 12.9544 4.96777 12.8633C4.75814 12.7721 4.57357 12.6468 4.41406 12.4873C4.25456 12.3278 4.12923 12.1432 4.03809 11.9336C3.94694 11.7194 3.90137 11.4915 3.90137 11.25C3.90137 11.1908 3.90365 11.1315 3.9082 11.0723C3.91276 11.013 3.92188 10.9561 3.93555 10.9014H0.75C0.672526 10.9014 0.604167 10.8809 0.544922 10.8398C0.485677 10.7943 0.442383 10.735 0.415039 10.6621C0.392253 10.5892 0.392253 10.5186 0.415039 10.4502C0.437826 10.3773 0.478841 10.318 0.538086 10.2725C0.738607 10.1221 0.916341 9.95345 1.07129 9.7666C1.23079 9.5752 1.36296 9.3724 1.46777 9.1582C1.57715 8.94401 1.65918 8.71842 1.71387 8.48145C1.77311 8.24447 1.80273 8.00065 1.80273 7.75V5.65137C1.80273 5.20931 1.87109 4.79004 2.00781 4.39355C2.14909 3.99707 2.34505 3.63704 2.5957 3.31348C2.84635 2.98535 3.14258 2.70508 3.48438 2.47266C3.82617 2.23568 4.19759 2.06022 4.59863 1.94629V1.44727C4.59863 1.16016 4.70117 0.914062 4.90625 0.708984C5.11133 0.503906 5.3597 0.401367 5.65137 0.401367C5.93848 0.401367 6.18457 0.503906 6.38965 0.708984C6.59473 0.914062 6.69727 1.16016 6.69727 1.44727V1.94629C7.10286 2.06022 7.47656 2.23568 7.81836 2.47266C8.16016 2.70508 8.4541 2.98535 8.7002 3.31348C8.95085 3.63704 9.14681 3.99707 9.28809 4.39355C9.42936 4.79004 9.5 5.20931 9.5 5.65137V7.75C9.5 8.00065 9.52734 8.24447 9.58203 8.48145C9.64128 8.71842 9.72331 8.94401 9.82812 9.1582C9.9375 9.3724 10.0697 9.5752 10.2246 9.7666C10.3796 9.95345 10.5573 10.1221 10.7578 10.2725ZM5.30273 1.44727V1.81641C5.35742 1.81185 5.41439 1.80957 5.47363 1.80957C5.53288 1.80501 5.59212 1.80273 5.65137 1.80273C5.71061 1.80273 5.76758 1.80501 5.82227 1.80957C5.88151 1.80957 5.94076 1.81185 6 1.81641V1.44727C6 1.35156 5.96582 1.26953 5.89746 1.20117C5.8291 1.13281 5.74707 1.09863 5.65137 1.09863C5.55566 1.09863 5.47363 1.13281 5.40527 1.20117C5.33691 1.26953 5.30273 1.35156 5.30273 1.44727ZM6.69727 11.25C6.69727 11.1908 6.69271 11.1315 6.68359 11.0723C6.67448 11.013 6.66081 10.9561 6.64258 10.9014H4.66016C4.64193 10.9561 4.62598 11.013 4.6123 11.0723C4.60319 11.1315 4.59863 11.1908 4.59863 11.25C4.59863 11.5417 4.70117 11.79 4.90625 11.9951C5.11133 12.2002 5.3597 12.3027 5.65137 12.3027C5.93848 12.3027 6.18457 12.2002 6.38965 11.9951C6.59473 11.79 6.69727 11.5417 6.69727 11.25ZM1.61816 10.1973H9.67773C9.59115 10.0924 9.50911 9.98079 9.43164 9.8623C9.35417 9.74382 9.28353 9.62305 9.21973 9.5C9.07845 9.22656 8.97363 8.94401 8.90527 8.65234C8.83691 8.36068 8.80273 8.0599 8.80273 7.75V5.65137C8.80273 5.21842 8.71842 4.81055 8.5498 4.42773C8.38574 4.04492 8.16016 3.71224 7.87305 3.42969C7.59049 3.14258 7.25781 2.91699 6.875 2.75293C6.49219 2.58431 6.08431 2.5 5.65137 2.5C5.21842 2.5 4.81055 2.58431 4.42773 2.75293C4.04492 2.91699 3.70996 3.14258 3.42285 3.42969C3.1403 3.71224 2.91471 4.04492 2.74609 4.42773C2.58203 4.81055 2.5 5.21842 2.5 5.65137V7.75C2.5 8.0599 2.46354 8.36068 2.39062 8.65234C2.32227 8.94401 2.21973 9.22656 2.08301 9.5C2.01921 9.62305 1.94857 9.74382 1.87109 9.8623C1.79362 9.98079 1.70931 10.0924 1.61816 10.1973Z"
                className={e("fill")}
            />
        ),
        viewBox: "0 0 11 13",
    },
    close: {
        content: (
            <path
                d="M11.332 10.7559L6.38281 5.79297L11.0723 1.11719C11.1178 1.0625 11.1406 0.998698 11.1406 0.925781C11.1406 0.852865 11.1178 0.789062 11.0723 0.734375C11.0176 0.679688 10.9492 0.652344 10.8672 0.652344C10.7943 0.652344 10.735 0.679688 10.6895 0.734375L6 5.41016L1.31055 0.734375C1.26497 0.679688 1.20117 0.652344 1.11914 0.652344C1.04622 0.652344 0.982422 0.679688 0.927734 0.734375C0.882161 0.789062 0.859375 0.852865 0.859375 0.925781C0.859375 0.998698 0.882161 1.0625 0.927734 1.11719L5.61719 5.79297L0.667969 10.7559C0.613281 10.8105 0.585938 10.8743 0.585938 10.9473C0.585938 11.0202 0.613281 11.084 0.667969 11.1387C0.695312 11.166 0.722656 11.1888 0.75 11.207C0.786458 11.2161 0.822917 11.2207 0.859375 11.2207C0.886719 11.2207 0.91862 11.2161 0.955078 11.207C0.991536 11.1888 1.02344 11.166 1.05078 11.1387L6 6.17578L10.9492 11.1387C10.9766 11.166 11.0085 11.1888 11.0449 11.207C11.0814 11.2161 11.1133 11.2207 11.1406 11.2207C11.1771 11.2207 11.209 11.2161 11.2363 11.207C11.2728 11.1888 11.3047 11.166 11.332 11.1387C11.3867 11.084 11.4141 11.0202 11.4141 10.9473C11.4141 10.8743 11.3867 10.8105 11.332 10.7559Z"
                className={e("fill")}
            />
        ),
        viewBox: "0 0 12 12",
    },
    question: {
        content: (
            <>
                <path
                    d="M9.95618 6.5C9.08558 6.5 8.41614 7.01519 8.22278 7.6258C8.12553 7.93293 7.7977 8.10307 7.49057 8.00581C7.18343 7.90856 7.01329 7.58073 7.11055 7.2736C7.47729 6.11545 8.64581 5.33333 9.95618 5.33333C11.5211 5.33333 12.9167 6.46884 12.9167 8.01667C12.9167 9.36868 11.8519 10.4061 10.5395 10.6469V11.75C10.5395 12.0722 10.2783 12.3333 9.95618 12.3333C9.63401 12.3333 9.37284 12.0722 9.37284 11.75V10.1167C9.37284 9.7945 9.63401 9.53333 9.95618 9.53333C11.0169 9.53333 11.75 8.78844 11.75 8.01667C11.75 7.24489 11.0169 6.5 9.95618 6.5Z"
                    className={e("fill")}
                />
                <path
                    d="M10 12.9167C9.51675 12.9167 9.125 13.3084 9.125 13.7917C9.125 14.2749 9.51675 14.6667 10 14.6667C10.4832 14.6667 10.875 14.2749 10.875 13.7917C10.875 13.3084 10.4832 12.9167 10 12.9167Z"
                    className={e("fill")}
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17ZM10 16.3C13.4794 16.3 16.3 13.4794 16.3 10C16.3 6.52061 13.4794 3.7 10 3.7C6.52061 3.7 3.7 6.52061 3.7 10C3.7 13.4794 6.52061 16.3 10 16.3Z"
                    className={e("fill")}
                />
            </>
        ),
        viewBox: "0 0 20 20",
    },
    crossCircle: {
        content: (
            <path
                d="M8.60156 8.07617L6.15234 5.90234L8.60156 3.72266C8.66016 3.66797 8.69141 3.59961 8.69531 3.51758C8.70312 3.43555 8.67969 3.36328 8.625 3.30078C8.57031 3.23828 8.5 3.20508 8.41406 3.20117C8.33203 3.19727 8.26172 3.22266 8.20312 3.27734L5.70117 5.49805L3.19922 3.27734C3.13672 3.22266 3.06445 3.19727 2.98242 3.20117C2.90039 3.20508 2.83203 3.23828 2.77734 3.30078C2.72266 3.36328 2.69727 3.43555 2.70117 3.51758C2.70508 3.59961 2.73828 3.66797 2.80078 3.72266L5.25 5.90234L2.80078 8.07617C2.73828 8.13086 2.70508 8.19922 2.70117 8.28125C2.69727 8.36328 2.72266 8.43555 2.77734 8.49805C2.80469 8.5332 2.83789 8.55859 2.87695 8.57422C2.91602 8.58984 2.95703 8.59766 3 8.59766C3.03516 8.59766 3.07031 8.5918 3.10547 8.58008C3.14062 8.56836 3.17188 8.54883 3.19922 8.52148L5.70117 6.30078L8.20312 8.52148C8.23047 8.54883 8.26172 8.56836 8.29688 8.58008C8.33203 8.5918 8.36719 8.59766 8.40234 8.59766C8.44141 8.59766 8.48047 8.58984 8.51953 8.57422C8.55859 8.55859 8.59375 8.5332 8.625 8.49805C8.67969 8.43555 8.70312 8.36328 8.69531 8.28125C8.69141 8.19922 8.66016 8.13086 8.60156 8.07617ZM5.70117 11.5977C5.31836 11.5977 4.94336 11.5605 4.57617 11.4863C4.21289 11.416 3.85938 11.3105 3.51562 11.1699C3.17578 11.0293 2.84961 10.8555 2.53711 10.6484C2.22852 10.4375 1.93945 10.1973 1.66992 9.92773C1.40039 9.66211 1.16211 9.37305 0.955078 9.06055C0.748047 8.74805 0.572266 8.42188 0.427734 8.08203C0.287109 7.74219 0.179688 7.38867 0.105469 7.02148C0.0351562 6.6543 0 6.28125 0 5.90234C0 5.51953 0.0351562 5.14648 0.105469 4.7832C0.179688 4.41602 0.287109 4.0625 0.427734 3.72266C0.572266 3.37891 0.748047 3.05273 0.955078 2.74414C1.16211 2.43164 1.40039 2.14062 1.66992 1.87109C1.93945 1.60156 2.22852 1.36328 2.53711 1.15625C2.84961 0.949219 3.17578 0.775391 3.51562 0.634766C3.85938 0.490234 4.21289 0.382812 4.57617 0.3125C4.94336 0.238281 5.31836 0.201172 5.70117 0.201172C6.08008 0.201172 6.45312 0.238281 6.82031 0.3125C7.1875 0.382812 7.54102 0.490234 7.88086 0.634766C8.22461 0.775391 8.55078 0.949219 8.85938 1.15625C9.17188 1.36328 9.46289 1.60156 9.73242 1.87109C10.002 2.14062 10.2402 2.43164 10.4473 2.74414C10.6543 3.05273 10.8281 3.37891 10.9688 3.72266C11.1094 4.0625 11.2168 4.41602 11.291 4.7832C11.3652 5.14648 11.4023 5.51953 11.4023 5.90234C11.4023 6.28125 11.3652 6.6543 11.291 7.02148C11.2168 7.38867 11.1094 7.74219 10.9688 8.08203C10.8281 8.42188 10.6543 8.74805 10.4473 9.06055C10.2402 9.37305 10.002 9.66211 9.73242 9.92773C9.46289 10.1973 9.17188 10.4375 8.85938 10.6484C8.55078 10.8555 8.22461 11.0293 7.88086 11.1699C7.54102 11.3105 7.1875 11.416 6.82031 11.4863C6.45312 11.5605 6.08008 11.5977 5.70117 11.5977ZM5.70117 0.798828C4.99805 0.798828 4.33594 0.933594 3.71484 1.20312C3.09766 1.46875 2.55664 1.83398 2.0918 2.29883C1.63086 2.75977 1.26562 3.30078 0.996094 3.92188C0.730469 4.53906 0.597656 5.19922 0.597656 5.90234C0.597656 6.60547 0.730469 7.26758 0.996094 7.88867C1.26562 8.50586 1.63086 9.04492 2.0918 9.50586C2.55664 9.9668 3.09766 10.332 3.71484 10.6016C4.33594 10.8672 4.99805 11 5.70117 11C6.4043 11 7.06445 10.8672 7.68164 10.6016C8.30273 10.332 8.84375 9.9668 9.30469 9.50586C9.76562 9.04492 10.1289 8.50586 10.3945 7.88867C10.6641 7.26758 10.7988 6.60547 10.7988 5.90234C10.7988 5.19922 10.6641 4.53906 10.3945 3.92188C10.1289 3.30078 9.76562 2.75977 9.30469 2.29883C8.84375 1.83398 8.30273 1.46875 7.68164 1.20312C7.06445 0.933594 6.4043 0.798828 5.70117 0.798828Z"
                className={e("fill")}
            />
        ),
        viewBox: "0 0 12 12",
    },
};
