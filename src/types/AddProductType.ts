export type AddProductForm = {
  name: string;
  slack: string;
  brand: string;
  number: number;
  price: number;
  discount: number;
  categoryId: number;
  description: string;
  specs: string;
  tags: Tag[];
  colors: Color[];
  image3DPath: string;
  imagePath: string;
  imagesPath: Image[];
};

export type Tag = {
  tag: string;
};
export type Color = {
  color: string;
  codeColor: string;
  price: number;
  discount: number;
  number: number;
};
export type Image = {
  image: string;
};
