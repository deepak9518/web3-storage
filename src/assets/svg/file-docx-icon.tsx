import React from 'react';
type FilePDFIconProps = {
  scale?: string;
};

export const FileDocsIcon = ({ scale }: FilePDFIconProps) => {
  return (
    <svg
      transform={scale && `scale(${scale})`}
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="none"
      viewBox="0 0 80 80"
    >
      <path fill="#2D80E1" d="M16 9.6h30.4l16.8 16.8v44H16V9.6z"></path>
      <path fill="#CFDCFF" d="M46.4 9.6v16.667h16.667"></path>
      <path
        fill="#fff"
        d="M26.98 48c-.485 0-.728-.243-.728-.728v-7.71c0-.485.243-.727.728-.727h2.509c1.508 0 2.67.394 3.484 1.183.823.788 1.235 1.92 1.235 3.393 0 1.473-.412 2.608-1.235 3.406-.815.788-1.976 1.183-3.484 1.183H26.98zm.624-1.131h1.807c2.262 0 3.393-1.153 3.393-3.458 0-2.297-1.131-3.445-3.393-3.445h-1.807v6.903zM39.993 48.117c-.876 0-1.634-.19-2.275-.572a3.968 3.968 0 01-1.495-1.638c-.347-.71-.52-1.543-.52-2.496 0-.962.173-1.794.52-2.496a3.88 3.88 0 011.495-1.625c.641-.382 1.4-.572 2.275-.572.866 0 1.62.19 2.262.572.65.381 1.148.923 1.495 1.625.355.702.533 1.53.533 2.483 0 .962-.178 1.798-.533 2.509a3.855 3.855 0 01-1.495 1.638c-.642.381-1.396.572-2.262.572zm0-1.17c.91 0 1.616-.308 2.119-.923.511-.624.767-1.495.767-2.613 0-1.118-.252-1.985-.754-2.6-.503-.616-1.214-.923-2.132-.923-.91 0-1.621.307-2.132.923-.503.615-.754 1.482-.754 2.6s.251 1.989.754 2.613c.511.615 1.222.923 2.132.923zM50.203 48.117c-.928 0-1.72-.19-2.38-.572a3.832 3.832 0 01-1.52-1.625c-.347-.71-.52-1.547-.52-2.51 0-.961.173-1.793.52-2.495a3.831 3.831 0 011.52-1.625c.66-.382 1.452-.572 2.38-.572.511 0 1 .07 1.469.208.476.138.888.338 1.235.598.19.121.299.268.325.442a.596.596 0 01-.078.455.57.57 0 01-.351.26c-.156.043-.33 0-.52-.13a3.13 3.13 0 00-.962-.481 3.65 3.65 0 00-1.08-.156c-.987 0-1.741.303-2.261.91-.52.606-.78 1.469-.78 2.587s.26 1.984.78 2.6c.52.606 1.274.91 2.262.91a3.78 3.78 0 001.092-.156 3.269 3.269 0 001-.494c.191-.122.36-.16.508-.117.147.034.26.117.338.247a.622.622 0 01-.195.845 3.848 3.848 0 01-1.274.65c-.477.147-.98.22-1.508.22z"
      ></path>
    </svg>
  );
};
