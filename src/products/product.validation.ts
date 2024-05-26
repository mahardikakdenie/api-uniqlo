import { z, ZodType } from 'zod';

export class ProductValidation {
  static validatePrice = (value) => {
    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) {
      return 'Price must be a valid number';
    }
    if (numberValue <= 0) {
      return 'Price must be a positive number';
    }
    return true;
  };

  static readonly CREATE_PRODUCT: ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(3).max(250),
    price: z.string().refine(this.validatePrice),
    owner_id: z.number(),
  });
}
