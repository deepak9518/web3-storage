import React from 'react';
type ExcelIconProps = {
  scale?: string;
};

export const ExcelIcon = ({ scale }: ExcelIconProps) => {
  return (
    <svg
      transform={scale && `scale(${scale})`}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 6H29L39.5 16.5V44H10V6Z" fill="#0ABF94" />
      <path
        d="M29.0001 6V14.3333C29.0001 14.8859 29 14.9375 29 16.4167C29 16.4167 30.5309 16.4167 31.0834 16.4167H39.4167"
        fill="#B5E9DC"
      />
      <path
        d="M19.6407 30.0563C19.472 30.0563 19.3501 29.9875 19.2751 29.85C19.2063 29.7125 19.2407 29.5563 19.3782 29.3813L20.7845 27.6375L19.4813 26.025C19.3376 25.8563 19.3032 25.7031 19.3782 25.5656C19.4532 25.4281 19.572 25.3594 19.7345 25.3594C19.8532 25.3594 19.9501 25.3813 20.0251 25.425C20.1063 25.4625 20.1813 25.5281 20.2501 25.6219L21.3282 26.9906L22.4157 25.6219C22.4845 25.5281 22.5563 25.4625 22.6313 25.425C22.7063 25.3813 22.8032 25.3594 22.922 25.3594C23.0845 25.3594 23.2032 25.4281 23.2782 25.5656C23.3532 25.7031 23.3188 25.8594 23.1751 26.0344L21.872 27.6469L23.2782 29.3813C23.4157 29.55 23.447 29.7063 23.372 29.85C23.3032 29.9875 23.1845 30.0563 23.0157 30.0563C22.8095 30.0563 22.6376 29.9688 22.5001 29.7938L21.3188 28.3125L20.147 29.7938C20.0782 29.8813 20.0063 29.9469 19.9313 29.9906C19.8563 30.0344 19.7595 30.0563 19.6407 30.0563Z"
        fill="white"
      />
      <path
        d="M25.9612 30.0844C25.4737 30.0844 25.1049 29.9438 24.8549 29.6625C24.6112 29.3813 24.4893 28.9688 24.4893 28.425V23.8031C24.4893 23.4844 24.6455 23.325 24.958 23.325C25.2768 23.325 25.4362 23.4844 25.4362 23.8031V28.3688C25.4362 28.9875 25.6862 29.2969 26.1862 29.2969C26.2424 29.2969 26.2924 29.2938 26.3362 29.2875C26.3799 29.2813 26.4237 29.2781 26.4674 29.2781C26.5424 29.2719 26.5955 29.2938 26.6268 29.3438C26.658 29.3875 26.6737 29.4813 26.6737 29.625C26.6737 29.8813 26.5549 30.0281 26.3174 30.0656C26.2549 30.0719 26.1924 30.075 26.1299 30.075C26.0737 30.0813 26.0174 30.0844 25.9612 30.0844Z"
        fill="white"
      />
      <path
        d="M28.9122 30.0844C28.6372 30.0844 28.3529 30.0531 28.0591 29.9906C27.7654 29.9281 27.4997 29.8219 27.2622 29.6719C27.156 29.6094 27.0904 29.5313 27.0654 29.4375C27.0404 29.3438 27.0466 29.2563 27.0841 29.175C27.1216 29.0938 27.181 29.0375 27.2622 29.0063C27.3497 28.9688 27.4466 28.9781 27.5529 29.0344C27.7966 29.1656 28.031 29.2594 28.256 29.3156C28.481 29.3719 28.7029 29.4 28.9216 29.4C29.2529 29.4 29.5029 29.3406 29.6716 29.2219C29.8404 29.1031 29.9247 28.9438 29.9247 28.7438C29.9247 28.5813 29.8685 28.4563 29.756 28.3688C29.6435 28.275 29.4747 28.2031 29.2497 28.1531L28.3591 27.975C27.5716 27.8125 27.1779 27.4063 27.1779 26.7563C27.1779 26.325 27.3497 25.9813 27.6935 25.725C28.0372 25.4688 28.4872 25.3406 29.0435 25.3406C29.606 25.3406 30.0904 25.4781 30.4966 25.7531C30.5966 25.8156 30.656 25.8938 30.6747 25.9875C30.6935 26.075 30.681 26.1594 30.6372 26.2406C30.5935 26.3156 30.5279 26.3688 30.4404 26.4C30.3591 26.4313 30.2622 26.4188 30.1497 26.3625C29.9622 26.25 29.7747 26.1688 29.5872 26.1188C29.3997 26.0625 29.2185 26.0344 29.0435 26.0344C28.7185 26.0344 28.4716 26.0969 28.3029 26.2219C28.1341 26.3406 28.0497 26.5031 28.0497 26.7094C28.0497 27.0219 28.256 27.2219 28.6685 27.3094L29.5591 27.4875C29.9654 27.5688 30.2716 27.7063 30.4779 27.9C30.6904 28.0938 30.7966 28.3563 30.7966 28.6875C30.7966 29.125 30.6247 29.4688 30.281 29.7188C29.9372 29.9625 29.481 30.0844 28.9122 30.0844Z"
        fill="white"
      />
    </svg>
  );
};
