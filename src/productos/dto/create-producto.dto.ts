import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductoDto {
  @IsNumber()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  categoriaId: number;
}
