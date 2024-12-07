'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { listingFormSchema, type ListingFormValues } from '@/lib/validations/listing'
import ImageUpload from '@/components/ImageUpload'

export default function AddListingPage() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      postcode: '',
      photos: [],
      bedrooms: 1,
      bathrooms: 1,
    },
  })

  async function onSubmit(data: ListingFormValues) {
    try {
      setIsLoading(true)
      // Here you would typically send the data to your backend
      console.log(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Listing</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2">Postcode</label>
          <input
            {...form.register('postcode')}
            className="w-full p-2 border rounded-md"
            placeholder="Enter postcode"
          />
          {form.formState.errors.postcode && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.postcode.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2">Photos</label>
          <ImageUpload
            value={form.watch('photos')}
            onChange={(value) => form.setValue('photos', value)}
          />
          {form.formState.errors.photos && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.photos.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Bedrooms</label>
            <input
              type="number"
              {...form.register('bedrooms', { valueAsNumber: true })}
              className="w-full p-2 border rounded-md"
              min={1}
            />
            {form.formState.errors.bedrooms && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.bedrooms.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2">Bathrooms</label>
            <input
              type="number"
              {...form.register('bathrooms', { valueAsNumber: true })}
              className="w-full p-2 border rounded-md"
              min={1}
            />
            {form.formState.errors.bathrooms && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.bathrooms.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Listing'}
        </button>
      </form>
    </div>
  )
} 