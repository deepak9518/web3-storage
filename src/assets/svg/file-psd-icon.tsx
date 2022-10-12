import React from 'react';
type FilePSDIconProps = {
  scale?: string;
};

export const FilePSDIcon = ({ scale }: FilePSDIconProps) => {
  return (
    <svg
      transform={scale && `scale(${scale})`}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.5 6.5H28.7929L39 16.7071V43.5H10.5V6.5Z" fill="#EBF8FF" stroke="#489CFF" />
      <path d="M29 7V15C29 15.5304 29 15.08 29 16.5C29 16.5 30.4696 16.5 31 16.5H39" fill="#EBF8FF" />
      <path
        d="M29 7V15C29 15.5304 29 15.08 29 16.5C29 16.5 30.4696 16.5 31 16.5H39L29 7Z"
        stroke="#489CFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2163 31V25.24H19.5443C19.6003 25.24 19.6696 25.2427 19.7523 25.248C19.8349 25.2507 19.9136 25.2587 19.9883 25.272C20.3083 25.3227 20.5749 25.432 20.7882 25.6C21.0043 25.768 21.1656 25.98 21.2723 26.236C21.3789 26.492 21.4323 26.7747 21.4323 27.084C21.4323 27.396 21.3789 27.68 21.2723 27.936C21.1656 28.192 21.0043 28.404 20.7882 28.572C20.5749 28.74 20.3083 28.8493 19.9883 28.9C19.9136 28.9107 19.8336 28.9187 19.7483 28.924C19.6656 28.9293 19.5976 28.932 19.5443 28.932H18.0523V31H17.2163ZM18.0523 28.14H19.5123C19.5656 28.14 19.6243 28.1373 19.6883 28.132C19.7549 28.1267 19.8176 28.1173 19.8763 28.104C20.0469 28.064 20.1843 27.9907 20.2883 27.884C20.3923 27.7747 20.4669 27.6493 20.5123 27.508C20.5576 27.3667 20.5803 27.2253 20.5803 27.084C20.5803 26.9427 20.5576 26.8027 20.5123 26.664C20.4669 26.5227 20.3923 26.3987 20.2883 26.292C20.1843 26.1827 20.0469 26.108 19.8763 26.068C19.8176 26.052 19.7549 26.0413 19.6883 26.036C19.6243 26.0307 19.5656 26.028 19.5123 26.028H18.0523V28.14ZM24.3199 31.12C23.9065 31.12 23.5332 31.0493 23.1999 30.908C22.8692 30.764 22.5959 30.56 22.3799 30.296C22.1665 30.0293 22.0279 29.7133 21.9639 29.348L22.8359 29.216C22.9239 29.568 23.1079 29.8427 23.3879 30.04C23.6679 30.2347 23.9945 30.332 24.3679 30.332C24.5999 30.332 24.8132 30.296 25.0079 30.224C25.2025 30.1493 25.3585 30.044 25.4759 29.908C25.5959 29.7693 25.6559 29.604 25.6559 29.412C25.6559 29.308 25.6372 29.216 25.5999 29.136C25.5652 29.056 25.5159 28.9867 25.4519 28.928C25.3905 28.8667 25.3145 28.8147 25.2239 28.772C25.1359 28.7267 25.0385 28.688 24.9319 28.656L23.4559 28.22C23.3119 28.1773 23.1652 28.1227 23.0159 28.056C22.8665 27.9867 22.7292 27.8973 22.6039 27.788C22.4812 27.676 22.3812 27.5387 22.3039 27.376C22.2265 27.2107 22.1879 27.0107 22.1879 26.776C22.1879 26.4213 22.2785 26.1213 22.4599 25.876C22.6439 25.628 22.8919 25.4413 23.2039 25.316C23.5159 25.188 23.8652 25.124 24.2519 25.124C24.6412 25.1293 24.9892 25.1987 25.2959 25.332C25.6052 25.4653 25.8612 25.6573 26.0639 25.908C26.2692 26.156 26.4105 26.4573 26.4879 26.812L25.5919 26.964C25.5519 26.748 25.4665 26.5627 25.3359 26.408C25.2052 26.2507 25.0452 26.1307 24.8559 26.048C24.6665 25.9627 24.4612 25.9187 24.2399 25.916C24.0265 25.9107 23.8305 25.9427 23.6519 26.012C23.4759 26.0813 23.3345 26.1787 23.2279 26.304C23.1239 26.4293 23.0719 26.5733 23.0719 26.736C23.0719 26.896 23.1185 27.0253 23.2119 27.124C23.3052 27.2227 23.4199 27.3013 23.5559 27.36C23.6945 27.416 23.8319 27.4627 23.9679 27.5L25.0319 27.8C25.1652 27.8373 25.3159 27.888 25.4839 27.952C25.6545 28.0133 25.8185 28.1 25.9759 28.212C26.1359 28.324 26.2679 28.4733 26.3719 28.66C26.4759 28.844 26.5279 29.076 26.5279 29.356C26.5279 29.6467 26.4692 29.9027 26.3519 30.124C26.2345 30.3427 26.0732 30.5267 25.8679 30.676C25.6652 30.8227 25.4305 30.9333 25.1639 31.008C24.8972 31.0827 24.6159 31.12 24.3199 31.12ZM27.3803 31V25.24H29.1843C29.2376 25.24 29.3363 25.2413 29.4803 25.244C29.627 25.2467 29.767 25.2573 29.9003 25.276C30.351 25.332 30.7296 25.4933 31.0363 25.76C31.3456 26.0267 31.579 26.3653 31.7363 26.776C31.8936 27.184 31.9723 27.632 31.9723 28.12C31.9723 28.6107 31.8936 29.0613 31.7363 29.472C31.579 29.88 31.3456 30.2173 31.0363 30.484C30.7296 30.748 30.351 30.908 29.9003 30.964C29.767 30.9827 29.627 30.9933 29.4803 30.996C29.3363 30.9987 29.2376 31 29.1843 31H27.3803ZM28.2363 30.204H29.1843C29.275 30.204 29.383 30.2013 29.5083 30.196C29.6336 30.1907 29.7443 30.18 29.8403 30.164C30.1336 30.108 30.371 29.9813 30.5523 29.784C30.7363 29.584 30.871 29.3387 30.9563 29.048C31.0416 28.7573 31.0843 28.448 31.0843 28.12C31.0843 27.7813 31.0403 27.468 30.9523 27.18C30.8643 26.8893 30.7283 26.6467 30.5443 26.452C30.363 26.2547 30.1283 26.1293 29.8403 26.076C29.7443 26.0573 29.6323 26.0467 29.5043 26.044C29.379 26.0387 29.2723 26.036 29.1843 26.036H28.2363V30.204Z"
        fill="#489CFF"
      />
    </svg>
  );
};