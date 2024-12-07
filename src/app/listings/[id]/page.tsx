import Image from 'next/image'
import { notFound } from 'next/navigation'

interface PreviewListingPageProps {
  params: {
    id: string
  }
}

export default async function PreviewListingPage({ params }: PreviewListingPageProps) {
  // In a real application, you would fetch the listing data from your backend
  const listing = {
    id: params.id,
    postcode: "SW1A 1AA",
    photos: ["https://example.com/photo1.jpg"],
    bedrooms: 2,
    bathrooms: 1
  }

  if (!listing) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Property Details</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative h-[300px]">
            {listing.photos[0] && (
              <Image
                src={listing.photos[0]}
                alt="Property"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            )}
          </div>
          
          {listing.photos.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {listing.photos.slice(1).map((photo, index) => (
                <div key={photo} className="relative h-[80px]">
                  <Image
                    src={photo}
                    alt={`Property ${index + 2}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Location</h2>
            <p>{listing.postcode}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold">Bedrooms</h2>
              <p>{listing.bedrooms}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Bathrooms</h2>
              <p>{listing.bathrooms}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 