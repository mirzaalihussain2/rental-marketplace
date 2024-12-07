import * as z from 'zod'

export const listingFormSchema = z.object({
  postcode: z.string()
    .min(5, "Postcode must be at least 5 characters")
    .max(8, "Postcode must not exceed 8 characters"),
  photos: z.array(z.string())
    .min(1, "At least one photo is required"),
  bedrooms: z.number()
    .min(1, "Must have at least 1 bedroom")
    .max(20, "Cannot exceed 20 bedrooms"),
  bathrooms: z.number()
    .min(1, "Must have at least 1 bathroom")
    .max(20, "Cannot exceed 20 bathrooms"),
})

export type ListingFormValues = z.infer<typeof listingFormSchema> 